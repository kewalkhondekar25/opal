import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import prisma from "@repo/db/client";
import ApiResponse from "@/lib/apiResponse";

const POST = async (req: NextRequest) => {

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const sig = req.headers.get("stripe-signature") || "";
    const buf = Buffer.from(await req.arrayBuffer());

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret!);
    } catch (error: any) {
        console.error("Webhook signature verification failed", error?.message ?? error);
        return new Response("Invalid signature", { status: 400 })
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {

                const session = event.data.object;
                const userEmail = session.client_reference_id
                const stripeCustId = session.customer as string || undefined;
                const subscriptionId = session.subscription as string || undefined;

                if (subscriptionId && userEmail) {
                    const sub = await stripe.subscriptions.retrieve(subscriptionId)
                    await prisma.subscription.upsert({
                        where: { stripeSubscriptionId: sub.id },
                        create: {
                            stripeSubscriptionId: sub.id,
                            status: sub.status,
                            currentPeriodStart: sub?.items?.data[0]?.current_period_start ? new Date(sub?.items?.data[0]?.current_period_start * 1000) : null,
                            currentPeriodEnd: sub?.items?.data[0]?.current_period_end ? new Date(sub?.items?.data[0]?.current_period_end * 1000) : null,
                            user: { connect: { email: userEmail } }
                        },
                        update: {
                            status: sub.status,
                            currentPeriodStart: sub?.items?.data[0]?.current_period_start ? new Date(sub?.items?.data[0]?.current_period_start * 1000) : null,
                            currentPeriodEnd: sub?.items?.data[0]?.current_period_end ? new Date(sub?.items?.data[0]?.current_period_end * 1000) : null
                        }
                    })
                }
                break;
            }

            case "invoice.paid": {
                const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
                const subscriptionId = invoice.subscription ?? null;
                if (subscriptionId) {
                    const sub = await stripe.subscriptions.retrieve(subscriptionId);
                    await prisma.subscription.update({
                        where: { stripeSubscriptionId: subscriptionId },
                        data: {
                            status: sub.status,
                            currentPeriodStart: sub?.items?.data[0]?.current_period_start ? new Date(sub?.items?.data[0]?.current_period_start * 1000) : null,
                            currentPeriodEnd: sub?.items?.data[0]?.current_period_end ? new Date(sub?.items?.data[0]?.current_period_end * 1000) : null
                        }
                    })

                }
                break;
            }

            case "invoice.payment_failed": {
                const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
                const subscriptionId = invoice.subscription ?? null;
                if (subscriptionId) {
                    await prisma.subscription.update({
                        where: { stripeSubscriptionId: subscriptionId },
                        data: { status: "past_due" }
                    });
                }
                break;
            }

            case "customer.subscription.updated":
            case "customer.subscription.deleted": {
                let sub = event.data.object;
                if(sub.status === "active"){
                    const cancelSub = await stripe.subscriptions.cancel(sub.id, {
                        invoice_now: false,
                        prorate: true
                    })
                    sub = cancelSub;
                }
                await prisma.subscription.update({
                    where: { stripeSubscriptionId: sub.id },
                    data: {
                        status: sub.status,
                        currentPeriodStart: sub?.items?.data[0]?.current_period_start ? new Date(sub?.items?.data[0]?.current_period_start * 1000) : null,
                        currentPeriodEnd: sub?.items?.data[0]?.current_period_end ? new Date(sub?.items?.data[0]?.current_period_end * 1000) : null
                    }
                });
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);       
        }
        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Webhook received"
        ), { status: 200 })
    } catch (error) {
        console.log("Webhook handler error", error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Webhook handler error"
        ), { status: 500 })
    }
};

export {
    POST
};