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

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "6", 10);

        const skip = (page - 1) * limit;

        const { tracks, total } = await prisma.$transaction( async(tx) => {
            
            const user = await tx.user.findUnique({
                where: { email },
                select: { id: true }
            });

            const tracks = await tx.tracks.findMany({
                skip,
                take: limit,
                where: { userId: user?.id },
                include: { videos: true },
                orderBy: { createdAt: "desc" }
            });

            const total = await tx.tracks.count();

            return { tracks, total };
        });

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Tracks fetched successfully",
            { 
                page,
                limit,
                total,
                totalPages,
                tracks
            }
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