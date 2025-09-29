import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Video } from 'lucide-react';

const LoadingTrack = () => {

    const tracks = Array.from({ length: 6 }, (_, i) => i + 1);

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
                            <Skeleton 
                                key={i} 
                                className="h-96 w-64
                                md:w-80 lg:w-full" />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default LoadingTrack