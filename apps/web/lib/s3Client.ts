import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const getS3Client = () => {
    return new S3Client({
        region: process.env.BUCKET!,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY!,
            secretAccessKey: process.env.SECRET_ACCESS_KEY!
        }
    });
};

export default getS3Client; 