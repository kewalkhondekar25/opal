import ApiResponse from "@/lib/apiResponse";
import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get("session_id");
        if (!sessionId) {
            return NextResponse.json(new ApiResponse(
                false,
                400,
                "Session id not found"
            ));
        };

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["subscription"]
        });
        if (!session) {
            return NextResponse.json(new ApiResponse(
                false,
                400,
                "Failed to retrive session"
            ), { status: 400 });
        };

        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Session fetched successfully",
            session
        ))

    } catch (error) {
        console.log(error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Error in fetching session"
        ));
    }
};

export {
    GET
};