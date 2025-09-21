import { NextRequest, NextResponse } from "next/server";
import { S3Client, UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ApiResponse from "@/lib/apiResponse";

const s3 = new S3Client({
    region: process.env.REGION!,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!
    }
});

export const POST = async (req: NextRequest) => {

    try {
        const { fileName, uploadId, partNumber } = await req.json();
    
        const command = new UploadPartCommand({
            Bucket: process.env.BUCKET,
            Key: fileName,
            UploadId: uploadId,
            PartNumber: partNumber
        });
    
        const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    
        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Pre signed url generated successfully",
            { presignedUrl }
        ), { status: 200 });
    } catch (error) {
        console.log("Error in generating pre signed url", error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Failed to generate presigned url"
        ), { status: 500 })
    }
};