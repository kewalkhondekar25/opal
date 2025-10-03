"use client";

import React, { useEffect, useState } from 'react';
import useRedux from '@/hooks/use-redux';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Loader, Loader2, Video } from 'lucide-react';
import Console from '../sidebar/console';
import Link from 'next/link';
import convertTime, { convertDate } from '@/lib/time';
import { Skeleton } from '../ui/skeleton';
import { getAllVideos } from '@/service/videoService';

interface ITrack {
    id: string,
    userId: string,
    videos: { url: string }[],
    createdAt: string
}

const Tracks = () => {

    const { tracks, isLoading, title }: {
        tracks: ITrack[],
        isLoading: boolean,
        title: string
    } = useRedux();

    const [trackData, setTrackData] = useState<any>([]);
    const transcodingNumber = tracks.filter(item => item?.videos?.length === 0)


    useEffect(() => {
        const fetchVideos = async (tracks: ITrack[]) => {

            const allTracks = tracks.map(async (item) => {
                const trackresponse = await getAllVideos(item.id);
                return {
                    videoUrls: trackresponse?.videoUrls
                }
            });
            const finalTracks = await Promise.all(allTracks);
            setTrackData(finalTracks)
        };
        fetchVideos(tracks)
    }, []);

    return (
        <section className='relative'>
            <div
                className='flex items-center gap-1 self-start text-2xl mb-5
                lg:place-self-start'>
                <span>
                    <Video />
                </span>
                <span>Videos</span>
            </div>
            {
                transcodingNumber &&
                <div className='absolute top-0 right-0 flex place-items-center text-xs  gap-1 my-1 p-1'>
                    <Loader className='size-4 animate-spin' />
                    <p className='font-semibold'>{transcodingNumber?.length} Transcoding</p>
                </div>
            }
            <div
                className='flex flex-col gap-3 justify-center items-center mx-1
                lg:grid lg:grid-cols-2 lg:gap-3 lg:place-items-center 
                xl:grid-cols-3'>
                {
                    tracks?.map((item, i) => {
                        
                        const { date, month } = convertDate(item?.createdAt);
                        const lastVideo = item.videos.length - 1;

                        return (trackData[i]?.videoUrls &&
                            <Link href={`/library/${item.id}`} key={i}>
                                <Card
                                    className='w-64
                                        md:w-80 lg:w-full'>
                                    <CardContent className='flex flex-col gap-3'>
                                        <div className="w-full aspect-video overflow- rounded-lg">
                                            <video
                                                src={trackData[i]?.videoUrls?.[0]}
                                                muted
                                                playsInline
                                                preload="metadata"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className='text-xl'>{title}</p>
                                        <div className='self-start'>
                                            <Console />
                                        </div>
                                    </CardContent>
                                    <CardFooter className='flex justify-between'>
                                        <p className='text-xs font-semibold'>
                                            <span>{date}/</span>
                                            <span>{month}</span>
                                        </p>
                                        <p className='text-xs font-semibold'>
                                            <span> {convertTime(item.createdAt)}</span>
                                        </p>
                                    </CardFooter>
                                </Card>
                            </Link>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Tracks