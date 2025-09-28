import ApiResponse from "@/lib/apiResponse";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
    try {
        const user = await currentUser();
        const email = user?.emailAddresses[0]?.emailAddress;
        if(!email){
            return NextResponse.json(new ApiResponse(
                false,
                404,
                "Invalid user"
            ), { status: 404 });
        };

        const tracks = await prisma.$transaction( async(tx) => {
            
            const user = await prisma.user.findUnique({
                where: { email },
                select: { id: true }
            });

            const tracks = await prisma.tracks.findMany({
                where: { userId: user?.id },
            });

            return tracks;
        });

        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Tracks fetched successfully",
            tracks
        ), { status: 200 });
    } catch (error) {
        console.log("Error in fetching tracks", error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Error in fetching tracks"
        ));
    }
};

export { GET };