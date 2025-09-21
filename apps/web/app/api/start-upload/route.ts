import { NextRequest, NextResponse } from "next/server";
import { S3Client, CreateMultipartUploadCommand } from "@aws-sdk/client-s3";
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
        const { fileName, contentType } = await req.json();
    
        const uploadCommand = new CreateMultipartUploadCommand({
            Bucket: process.env.BUCKET,
            Key: fileName,
            ContentType: contentType
        });
    
        const response = await s3.send(uploadCommand);
        const uploadId = response.UploadId;
        
        return NextResponse.json(new ApiResponse(
            true,
            200,
            "Start multipart upload id created successfully",
            { uploadId }
        ));
    } catch (error) {
        console.log("Error in creating multipart upload id", error);
        return NextResponse.json(new ApiResponse(
            false,
            500,
            "Failed to create multipart upload id"
        ));
    }
};