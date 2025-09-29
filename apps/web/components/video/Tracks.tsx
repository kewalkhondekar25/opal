import React from 'react';
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
import { Video } from 'lucide-react';
import Console from '../sidebar/console';
import Link from 'next/link';

const Tracks = () => {

    const { tracks, isLoading  }: { 
        tracks: { id: string, userId: string, videos: [] }[],
        isLoading: boolean
    } = useRedux();
    // .filter(item => item.videos.length !== 0)

    return (
        <section>
            <div
                className='flex items-center gap-1 self-start text-2xl mb-5
                lg:place-self-start'>
                <span>
                    <Video />
                </span>
                <span>Videos</span>
            </div>
            <div
                className='flex flex-col gap-3 justify-center items-center mx-1
                lg:grid lg:grid-cols-2 lg:gap-3 lg:place-items-center 
                xl:grid-cols-3'>
                {
                    tracks?.map((item, i) => {
                        return (
                            <Link href={`/library/${item.id}`} key={i}>
                                <Card 
                                    className='w-64
                                    md:w-80 lg:w-full'>
                                    <CardContent className='flex flex-col gap-3'>
                                        <img src="/video-demo.svg" alt="demo" />
                                        <p className='text-xl'>Unleashing the power of Speech to Recognition</p>
                                        <div className='self-start'>
                                            <Console />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <p className='text-xs'>1 day ago</p>
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