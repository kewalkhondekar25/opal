import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const LoadingVideos = () => {

    const video = [1, 2, 3, 4];

    return (
        <section className='flex flex-col items-center w-screen gap-3 mx-2'>
            {/* screen */}
            <Skeleton 
                className=" w-full h-32 mt-14
                sm:h-80
                md:h-64
                lg:h-96"/>

            <Skeleton className="w-10 h-3 self-start mt-2" />

            {/* title */}
            <Skeleton className="w-3/4 h-14 self-start" />

            <Skeleton className="w-52 h-3 self-start" />
            <div className='self-start'>
                <div className='flex'>
                    {
                        video.map((item, i) => {
                            return (
                                <div key={i}>
                                    <div
                                        className='dark:bg-[#171717] p-2 m-1 dark:border dark:border-white rounded-lg'>
                                        <Loader className='animate-spin' />
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
            </div>
            <div className='flex gap-1 self-start'>
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className='flex flex-col gap-1 justify-center items-center'>
                    <Skeleton className="h-3 w-40"/>
                    <Skeleton className="h-3 w-40" />
                </div>
            </div>
            <Separator className='my-3' />
            <Skeleton className="h-3 w-12 self-start" />
            <Skeleton 
                className="h-80 w-full self-start
                sm:h-52" />
        </section>
    )
}

export default LoadingVideos