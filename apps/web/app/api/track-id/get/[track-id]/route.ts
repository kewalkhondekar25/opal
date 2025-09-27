import ApiResponse from "@/lib/apiResponse";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
    req: NextRequest,
    { params }: { params: Promise<{ "track-id": string}>}
) => {
    const { "track-id": trackId } = await params;

    const track = await prisma.tracks.findUnique({
        where: { id: trackId }
    });

    if(!track){
        return NextResponse.json(new ApiResponse(
            false,
            404,
            "No such track found"
        ));
    };

    return NextResponse.json(new ApiResponse(
        true,
        200,
        "Track id fetched successfully",
        track
    ));
};

export {
    GET
}