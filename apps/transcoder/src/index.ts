import dotenv from "dotenv";
dotenv.config();
import fsOld from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import ffmpeg from "fluent-ffmpeg";
import prisma from "@repo/db/client";
import OpenAI from "openai";

const s3Client = new S3Client({
    region: process.env.REGION!,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!
    }
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const resolutions = [
    { name: "360p", height: "360", width: "640" },
    { name: "480p", height: "480", width: "854" },
    { name: "720p", height: "720", width: "1280" },
    { name: "1080p", height: "1080", width: "1920" },
];

const userId = process.env.USER_ID!;
const trackId = process.env.TRACK_ID!;

const extractAudio = (input: string, output: string, trackId: string) => {
    return new Promise<void>((resolve, reject) => {
        ffmpeg(input)
            .noVideo()
            .withAudioCodec("libmp3lame")
            .save(output)
            .on("end", async () => {
                try {
                    console.log("Audio extracted");

                    const audioStream = fsOld.createReadStream(output);

                    console.log("Transcription in progress");

                    const transcript = await openai.audio.transcriptions.create({
                        file: audioStream,
                        model: "gpt-4o-mini-transcribe",
                        response_format: "text"

                    });

                    if (transcript) {
                        console.log("Transcript generated");
                    };

                    const title = await openai.responses.create({
                        model: "gpt-5-nano",
                        reasoning: { effort: "medium" },
                        instructions: "Based on the provided transcript, generate a short and catchy title for the video. The title should be concise and clearly reflect the content of the transcript.",
                        input: transcript
                    });

                    await prisma.tracks.update({
                        where: { id: trackId },
                        data: { 
                            transcript,
                            title: title.output_text 
                        }
                    });

                    await prisma.notifications.create({
                        data: {
                           userId,
                           title: "AI Generated Transcript",
                           subTitle: "Transcript for your videos are ready" 
                        }
                    })

                    console.log("Transcript saved in db");
                } catch (error) {
                    console.log("Error during transcoding or db operation", error);
                }
                resolve()
            })
            .on("error", (err) => {
                console.log("Error in Audio extraction");
                reject(err);
            })
    })
};

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

    await prisma.tracks.update({
        where: { id: trackId },
        data: { status: "TRANSCODING" }
    });

    const promises = resolutions.map(resolution => {

        const output = `video-${trackId}-${resolution.name}.mp4`;

        return new Promise<void>((resolve, _) => {

            ffmpeg(orignalVideoPath)
                .output(output)
                .withVideoCodec("libx264")
                .audioCodec("aac")
                .withSize(`${resolution.width}x${resolution.height}`)
                .on("end", async () => {
                    try {
                        //upload transcoded videos
                        const s3PutCommand = new PutObjectCommand({
                            Bucket: process.env.FINAL_BUCKET,
                            Key: output,
                            Body: fsOld.createReadStream(path.resolve(output))
                        });
                        await s3Client.send(s3PutCommand);
                        console.log(`uploaded: ${output}`);

                        await prisma.$transaction([

                            prisma.videos.create({
                                data: { trackId, url: output }
                            }),

                            prisma.notifications.create({
                                data: {
                                    userId,
                                    title: `Video ready in ${resolution.name}`,
                                    subTitle: "Your video is being optimized for smooth playback"
                                }
                            })
                        ]);
                        console.log("Saved to database");
                    } catch (error) {
                        await prisma.notifications.create({
                            data: {
                                userId,
                                title: `Failed to transcode ${resolution.name}`,
                                subTitle: "We could not generate this version"
                            }
                        });
                    }
                    resolve();
                })
                .on("error", async (err) => {
                    console.log("FFMPEG error", err);
                    await prisma.tracks.update({
                        where: { id: trackId },
                        data: { status: "FAILED" }
                    })
                })
                .format("mp4")
                .run()
        })
    });

    await Promise.all(promises);
    console.log("Transcoded successfully");

    const audioOutput = `audio-${trackId}.mp3`;
    await Promise.all([extractAudio(orignalVideoPath, audioOutput, trackId)]);
    await prisma.tracks.update({
        where: { id: trackId },
        data: { status: "COMPLETED" }
    });
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