import ApiResponse from "@/lib/apiResponse";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
    try {
        const userSession = await currentUser();
        const userEmail = userSession?.emailAddresses?.[0]?.emailAddress;
        if (!userEmail) {
            return NextResponse.json(new ApiResponse(
                false,
                404,
                "Unauthorized user"
            ));
        };

        const user = await prisma.user.findUnique({
            where: { email: userEmail },
            select: { id: true, stripeCustomerId: true }
        });

        if (!user?.id) {
            return NextResponse.json(new ApiResponse(
                false,
                404,
                "Unauthorized user"
            ));
        };

        const session = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId!,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
            configuration: process.env.STRIPE_CONFIGURATION_ID
        });

        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Manage billing session created",
            session.url
        ));
    } catch (error) {
        console.log(error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Error creating manage billing session"
        ));
    }
};

export {
    POST
};