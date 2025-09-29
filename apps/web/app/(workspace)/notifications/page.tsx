"use client";

import Loading from '@/components/notification/Loading';
import { Separator } from '@/components/ui/separator'
import useRedux from '@/hooks/use-redux';
import convertTime from '@/lib/time';
import { updateNotifications } from '@/service/notifications';
import { Bell, BellRing } from 'lucide-react'
import React, { useEffect } from 'react'

const page = () => {
    const {
        isNotificationLoading,
        notifications,
    } = useRedux();

    const unReadNotifications = notifications
        .filter(item => item.isRead === false)
        .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    

    useEffect(() => {
        const markReadNotification = async (notificationId: string) => {
            try {
                console.log("will read");
                const response = await updateNotifications(notificationId);
            } catch (error) {
                console.log(error);
            }
        };
        if(unReadNotifications.length >= 1){
            markReadNotification(unReadNotifications?.[0]?.id)
        }
    }, [unReadNotifications]);
    

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
                                                <p className='text-xs'>
                                                    {
                                                        convertTime(item.createdAt)
                                                    }
                                                </p>
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