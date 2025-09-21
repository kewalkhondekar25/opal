import { NextRequest, NextResponse } from "next/server";
import { S3Client, CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
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
        const { fileName, uploadId, parts } = await req.json();
        
        //parts - { eTag, partNumber }[]
        const command = new CompleteMultipartUploadCommand({
            Bucket: process.env.BUCKET,
            Key: fileName,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: parts
            }
        });

        const response = await s3.send(command);

        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Multipart upload created successfully",
            response
        ), { status: 200 });

    } catch (error) {
        console.log("Error in completing multipart upload", error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Failed to complete multipart upload"
        ), { status: 500 })
    }
};