import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if(!WEBHOOK_SECRET){
        throw new Error("Clerk webhook secret not found");
    };

    const headerPayload = headers();
    const svix_id = (await headerPayload).get("svix-id");
    const svix_timestamp = (await headerPayload).get("svix-timestamp");
    const svix_signature = (await headerPayload).get("svix-signature");

    if(!svix_id || !svix_timestamp || !svix_signature){
        return NextResponse.json({
            success: false,
            statusCode: 404,
            message: "No svix headers found"
        }, { status: 404})
    };

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evnt: WebhookEvent;

    try {
        evnt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        }) as WebhookEvent;
    } catch (error) {
        console.error("Error verifying webhook", error);
        return NextResponse.json({
            success: false,
            statusCode: 400,
            message: "Webhook Error"
        })
    }

    const { id } = evnt.data;
    const eventType = evnt.type;

    if(eventType === "user.created"){
        try {
            const { email_addresses, primary_email_address_id} = evnt.data;
            const primaryEmail = email_addresses.find(email => email.id === primary_email_address_id);
            if(!primaryEmail){
                return NextResponse.json({
                    success: false,
                    statusCode: 400,
                    message: "No primary email found"
                });
            }
            await prisma.user.create({
                data: {
                    email: primaryEmail.email_address
                }
            })
        } catch (error) {
            return NextResponse.json({
                success: false,
                statusCode: 400,
                message: "Error creating user in database"
            });
        }
    };

    return NextResponse.json({
        success: true,
        statusCode: 200,
        message: "Webhook recived successfully"
    });
};

export { POST };