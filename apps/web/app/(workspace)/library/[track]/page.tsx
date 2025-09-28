"use client";

import React, { useEffect } from 'react';
import Console from '@/components/sidebar/console';
import useRedux from '@/hooks/use-redux';
import { getAllVideos } from '@/service/videoService';
import { Film } from 'lucide-react';
import { useParams } from 'next/navigation';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from '@/components/ui/separator';
import Transcript from '@/components/video/Transcript';

const page = () => {

    const { track: trackId } = useParams() as { track: string }

    const { dispatch, setVideos, videos } = useRedux();
    const video = [1, 2, 3, 4];

    useEffect(() => {
        const fetchVideos = async (trackId: string) => {
            try {
                const videos = await getAllVideos(trackId);
                console.log(videos);
                dispatch(setVideos(videos));
            } catch (error) {
                console.log(error);
            }
        };
        // fetchVideos(trackId);
    }, []);

    return (
        <section className='flex flex-col justify-center items-center gap-3 mx-2'>
            <video
                className='md:mt-5 lg:mt-20'
                controls
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></video>
            <p className='text-xl font-semibold self-start'>Unleashing the power of Speech to Recognition</p>
            <div className='self-start'>
                <p className='text-md'>Download Transcoded Videos</p>
                <div className='flex'>
                    {
                        video.map((item, i) => {
                            return (
                                <Tooltip key={i}>
                                    <TooltipTrigger className='cursor-pointer'>
                                        <div
                                            className='dark:bg-[#171717] p-2 m-1 dark:border dark:border-white rounded-lg'>
                                            <Film />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className='font-semibold'>
                                            {
                                                i === 0 ? "360p" : 
                                                i === 1 ? "480p" :
                                                i === 2 ? "720p" : "1080p"
                                            }
                                        </p>
                                    </TooltipContent>
                                </Tooltip>

                            )
                        })

                    }
                </div>
            </div>
            <div className='self-start'>
                <Console />
            </div>
            <Separator className='my-3'/>
            <Transcript/>
        </section>
    )
}

export default page