"use client";

import Loading from '@/components/notification/Loading';
import { Separator } from '@/components/ui/separator'
import useRedux from '@/hooks/use-redux';
import { Bell, BellRing } from 'lucide-react'
import React from 'react'

const page = () => {
    const {
        isNotificationLoading,
        notifications,
    } = useRedux();

    if (isNotificationLoading) {
        return <Loading />
    } else {


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
                                        <div className='dark:bg-[#171717] p-3 border rounded-full'>
                                            {
                                                item.isRead ?
                                                    <Bell className='h-5 w-5' /> :
                                                    <BellRing className='h-5 w-5' />
                                            }
                                        </div>
                                        <div className={`${!item.isRead && "font-bold"} flex flex-col w-full`}>
                                            <div className="flex justify-between">
                                                <p className="text-sm">{item.title}</p>
                                                <p className='text-xs'>12:00</p>
                                            </div>
                                            <p className='text-xs'>{item.subTitle}</p>
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
}

export default page