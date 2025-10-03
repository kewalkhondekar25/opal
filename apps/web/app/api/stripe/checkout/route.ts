import ApiResponse from "@/lib/apiResponse";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@repo/db/client";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const priceId = process.env.STRIPE_PRICE_ID;

const POST = async (req: NextRequest) => {
    try {
        let stripeCustId: string;
        const user = await currentUser();
        const email = user?.emailAddresses?.[0]?.emailAddress;
        if (!email) {
            return NextResponse.json(new ApiResponse(
                false,
                401,
                "Unauthorized"
            ));
        };

        const validUser = await prisma.user.findUnique({
            where: { email },
            select: { email: true, stripeCustomerId: true }
        });

        if (!validUser?.email) {
            return NextResponse.json(new ApiResponse(
                false,
                401,
                "Unauthorized"
            ));
        };

        stripeCustId = validUser?.stripeCustomerId!;

        if(!validUser?.stripeCustomerId){
            const stripeCustomer = await stripe.customers.create({
                email: validUser.email
            });
            
            stripeCustId = stripeCustomer.id;
            
            await prisma.user.update({
                where: { email: validUser.email },
                data: { stripeCustomerId: stripeCustomer.id }
            });
        }

        //create session
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer: stripeCustId,
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
            client_reference_id: validUser.email
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.log(error);
    }
};

export {
    POST
}