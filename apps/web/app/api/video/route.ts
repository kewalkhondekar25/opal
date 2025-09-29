import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import prisma from "@repo/db/client";
import getS3Client from "@/lib/s3Client";
import ApiResponse from "@/lib/apiResponse";

const s3 = getS3Client();

const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const trackId = searchParams.get("trackId");
        if(!trackId){
            return NextResponse.json(new ApiResponse(
                false,
                400,
                "Query param track id not found"
            ));
        };

        const videos = await prisma.videos.findMany({
            where: { trackId }
        });

        if (videos.length === 0) {
            return NextResponse.json(new ApiResponse(
                true,
                200,
                "Videos fetched successfully",
                { length: 0 }
            ));
        };

        const videoPromise = videos.map(async (item, i) => {
            const command = new GetObjectCommand({
                Bucket: process.env.FINAL_BUCKET!,
                Key: item.url
            });
            return await getSignedUrl(s3, command);
        });

        const videoUrls = await Promise.all(videoPromise);

        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Videos fetched successfully",
            videoUrls
        ), { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Error in fetching videos"
        ), { status: 500 });
    }
};

export {
    GET
}