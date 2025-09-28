"use client";

import React from 'react';
import useRedux from '@/hooks/use-redux';
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from '@/components/ui/separator';

const Loading = () => {
    
    const notifications = Array.from({ length: 5 }, (_, i) => i + 1)
    
    return (
        <section
            className='flex flex-col w-screen mx-2'>
            <h1 className='mt-10 text-2xl font-semibold'>Notifications</h1>
            <div className='flex flex-col mt-10'>
                {
                    notifications?.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className='flex flex-col gap-2 w-full cursor-pointer'>
                                <div className='flex justify-start items-center gap-3'>
                                    <div className=''>
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                    </div>
                                    <div className={`flex flex-col gap-1 w-full`}>
                                        <Skeleton className="h-4 w-52 md:w-64 lg:w-72 xl:w-96" />
                                        <Skeleton className="h-4 w-52 md:w-64 lg:w-72 xl:w-96" />
                                    </div>
                                </div>
                                <Separator className='my-1' />
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Loading