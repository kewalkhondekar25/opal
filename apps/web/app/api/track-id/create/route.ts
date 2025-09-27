import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
import ApiResponse from "@/lib/apiResponse";

const POST = async (req: NextRequest) => {

    try {
        const user = await currentUser();
        
        const email = user?.emailAddresses[0]?.emailAddress;
        if(!email){
            return NextResponse.json(new ApiResponse(
                false,
                404,
                "User with this email not found"
            ));
        };

        const [userId, trackId] = await prisma.$transaction(async (tx) => {

            const user = await tx.user.findUnique({
                where: { email },
                select: { id: true }
            });

            const trackId = await tx.tracks.create({
                data: { userId: user?.id! },
                select: { id: true }
            });

            return [user?.id, trackId?.id];
        });
        
        return NextResponse.json(new ApiResponse(
            true,
            201,
            "Track created successfully",
            { userId, trackId }
        ));
    } catch (error) {
        console.log("Error in creating track", error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Error in creating track"
        ))
    }
};

export {
    POST
}