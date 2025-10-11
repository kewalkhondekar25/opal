"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { BellRing } from "lucide-react";
import { Separator } from "../ui/separator";


export function FeaturesSection() {
    const features = [
        {
            title: "Seamless Screen Recording",
            description:
                "Captures your screen, audio in high quality directly from your browser",
            skeleton: <SkeletonOne />,
            className:
                "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
        },
        {
            title: "High-Speed Video Transcoding",
            description:
                "Powered by FFmpeg, Opal automatically converts and optimizes your recordings into the best formats and resolutions.",
            skeleton: <SkeletonTwo />,
            className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
        },
        {
            title: "Watch our Demo",
            description:
                "You can get to know about our product on YouTube",
            skeleton: <SkeletonThree />,
            className:
                "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
        },
        {
            title: "All Transcodings with AI Transcripts",
            description:
                "High-quality video processing with transcripts using advanced OpenAI speech-to-text models.",
            skeleton: <SkeletonFour />,
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
        },
    ];
    return (
        <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
            <div className="px-8">
                <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                    Packed with powerful of features
                </h4>

                <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
                    From screen recording to multipart uploads, FFmpeg transcoding, OpenAI transcripts, and Stripe payments. Opal handles your entire video workflow, end to end.
                </p>
            </div>

            <div className="relative ">
                <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} className={feature.className}>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                            <div className=" h-full w-full">{feature.skeleton}</div>
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

const FeatureCard = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
            {children}
        </div>
    );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
            {children}
        </p>
    );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p
            className={cn(
                "text-sm md:text-base  max-w-4xl text-left mx-auto",
                "text-neutral-500 text-center font-normal dark:text-neutral-300",
                "text-left max-w-sm mx-0 md:text-sm my-2"
            )}
        >
            {children}
        </p>
    );
};

export const SkeletonOne = () => {
    return (
        <div className="relative flex py-8 px-2 gap-10 h-full">
            <div className="w-full  p-5  mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
                <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
                    {/* TODO */}
                    <img
                        src="https://res.cloudinary.com/kewalkhondekar/image/upload/v1760184648/opal/record1_zugu3y.png"
                        alt="header"
                        width={800}
                        height={800}
                        className="h-full w-full aspect-square object-cover object-left-top rounded-sm"
                    />
                </div>
            </div>

            <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
            <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
        </div>
    );
};

export const SkeletonThree = () => {
    return (
        <a
            href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
            target="__blank"
            className="relative flex gap-10  h-full group/image"
        >
            <div className="w-full  mx-auto bg-transparent dark:bg-transparent group h-full">
                <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
                    {/* TODO */}
                    {/* <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto " /> */}
                    <img
                        src="https://assets.aceternity.com/fireship.jpg"
                        alt="header"
                        width={800}
                        height={800}
                        className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
                    />
                </div>
            </div>
        </a>
    );
};

export const SkeletonTwo = () => {

    const notifications = [
        {
            "title": "AI Generated Transcript",
            "message": "Transcript for your videos are ready"
        },
        {
            "title": "Video ready in 1080p",
            "message": "Your video is being optimized for smooth playback"
        },
        {
            "title": "Video ready in 720p",
            "message": "Your video is being optimized for smooth playback"
        },
        {
            "title": "Video ready in 480p",
            "message": "Your video is being optimized for smooth playback"
        },
        {
            "title": "Video ready in 360p",
            "message": "Your video is being optimized for smooth playback"
        },
        {
            "title": "Your video is queued",
            "message": "Transcoding will start soon"
        },
        {
            "title": "AI Generated Transcript",
            "message": "Transcript for your videos are ready"
        },
        {
            "title": "Video ready in 1080p",
            "message": "Your video is being optimized for smooth playback"
        },
        {
            "title": "Video ready in 720p",
            "message": "Your video is being optimized for smooth playback"
        },
        {
            "title": "Video ready in 480p",
            "message": "Your video is being optimized for smooth playback"
        },
        {
            "title": "Video ready in 360p",
            "message": "Your video is being optimized for smooth playback"
        },
        {
            "title": "Your video is queued",
            "message": "Transcoding will start soon"
        }
    ];

    return (
        <div>
            {
                notifications.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className='flex flex-col gap-2 w-full cursor-pointer'>
                            <div className='flex justify-start items-center gap-3'>
                                <div className='dark:bg-[#171717] p-3 border rounded-full'>
                                    <BellRing/>
                                </div>
                                <div className=" flex flex-col w-full">
                                    <div className="flex justify-between font-semibold">
                                        <p className="text-sm">{item.title}</p>
                                    </div>
                                    <p className='text-xs font-semibold'>{item.message}</p>
                                </div>
                            </div>
                            <Separator className='my-1' />
                        </div>
                    )
                })
            }
        </div>
    );
};

export const SkeletonFour = () => {
    return (
        <div className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
            <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
                {/* TODO */}
                {/* <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto " /> */}
                <img
                    src="https://res.cloudinary.com/kewalkhondekar/image/upload/v1760185520/opal/al-transcripts_cufoev.png"
                    alt="header"
                    width={800}
                    height={800}
                />
            </div>
        </div>
    );
};
