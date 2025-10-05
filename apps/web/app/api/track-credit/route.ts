import ApiResponse from "@/lib/apiResponse";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
    try {
        const session = await currentUser();
        const userEmail = session?.emailAddresses?.[0]?.emailAddress;
        if (!userEmail) {
            return NextResponse.json(new ApiResponse(
                false,
                401,
                "Unauthorized session"
            ), { status: 401 });
        };

        const validUser = await prisma.user.findUnique({
            where: { email: userEmail },
            select: { id: true, email: true }
        });

        if (!validUser?.email) {
            return NextResponse.json(new ApiResponse(
                false,
                401,
                "Unauthorized user"
            ), { status: 401 });
        };

        const tracks = await prisma.tracks.count({
            where: {
                userId: validUser?.id,
                status: {
                    in: ["TRANSCODING", "COMPLETED"]
                },
            },
        });

        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Credits fetched successfully",
            { trackCount: tracks }
        ), { status: 200 });


        //check if free plan exceed? videos <= 3
        //check if pro plan exceed? videos <= 10

    } catch (error) {
        console.log(error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Error in fetching credits"
        ), { status: 500 });
    }
};

export {
    GET
}