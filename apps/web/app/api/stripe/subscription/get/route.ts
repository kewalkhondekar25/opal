import ApiResponse from "@/lib/apiResponse";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
    try {
        const userSession = await currentUser();
        const userEmail = userSession?.emailAddresses?.[0]?.emailAddress;
        if (!userEmail) {
            return NextResponse.json(new ApiResponse(
                false,
                404,
                "Session not found"
            ));
        };

        const validUser = await prisma.user.findUnique({
            where: { email: userEmail },
            select: {
                id: true,
                email: true,
                stripeCustomerId: true,
                subscription: true
            }
        });
        if (!validUser?.email) {
            return NextResponse.json(new ApiResponse(
                false,
                401,
                "Unauthorized user"
            ));
        }

        const subscriptionStatus = validUser?.subscription?.status;
        //return boolean if user has pro plan
        if (validUser.subscription?.status === "canceled" || validUser.subscription?.status === "past_due") {
            return NextResponse.json(new ApiResponse(
                true,
                200,
                "Subscription fetched successfully",
                { isActive: true, subscriptionStatus }
            ))
        };

        if (!validUser.stripeCustomerId || validUser?.subscription?.status !== "active") {
            return NextResponse.json(new ApiResponse(
                true,
                200,
                "Subscription fetched successfully",
                { isActive: false }
            ))
        };


        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Subscription fetched successfully",
            { isActive: true, subscriptionStatus }
        ));
    } catch (error) {
        console.log(error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Error fetching subscription plan"
        ));
    }
};

export {
    GET
}