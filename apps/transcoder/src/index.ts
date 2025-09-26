import dotenv from "dotenv";
dotenv.config();
import fsOld from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import ffmpeg from "fluent-ffmpeg";

const s3Client = new S3Client({
    region: process.env.REGION!,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!
    }
});

const resolutions = [
    { name: "360p", height: "360", width: "640" },
    { name: "480p", height: "480", width: "854" },
    { name: "720p", height: "720", width: "1280" },
    { name: "1080p", height: "1080", width: "1920" },
]

const main = async () => {

    //pre-processed-video
    const s3Command = new GetObjectCommand({
        Bucket: process.env.BUCKET,
        Key: process.env.KEY,
    });
    
    const videoFile = await s3Client.send(s3Command);
    
    const orignalFilePath = `orignal-video.webm`;
    //@ts-ignore
    await fs.writeFile(orignalFilePath, videoFile.Body);
    //converts into absolute path
    const orignalVideoPath = path.resolve(orignalFilePath);
    
    //use ffmpeg to transcode
    console.log("start transcoding");
    const promises = resolutions.map(resolution => {
        
        const output = `video-${resolution.name}-${Date.now()}.mp4`;
        
        return new Promise<void>((resolve, _) => {

            ffmpeg(orignalVideoPath)
            .output(output)
            .withVideoCodec("libx264")
            .audioCodec("aac")
            .withSize(`${resolution.width}x${resolution.height}`)
            .on("end", async () => {
                //upload transcoded videos
                const s3PutCommand = new PutObjectCommand({
                    Bucket: process.env.FINAL_BUCKET,
                    Key: output,
                    Body: fsOld.createReadStream(path.resolve(output)) 
                });
                await s3Client.send(s3PutCommand);
                console.log(`uploaded: ${output}`);
                resolve();
            })
            .format("mp4")
            .run()
        })
    });

    await Promise.all(promises);
    console.log("Transcoded successfully");
};

main()
  .then(() => {
    console.log("Transcoded successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Transcoding failed:", err);
    process.exit(1);
});