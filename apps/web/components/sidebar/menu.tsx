"use client";

import { menuItems } from '@/constants/sidebar-menu'
import useRedux from '@/hooks/use-redux';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Menu = () => {

    const pathName = usePathname();
    const { notifications } = useRedux();
    const notificationCount = notifications.filter(item => item.isRead === false );

    return (
        <div className='flex flex-col mx-5'>
            <div className='my-3 font-semibold'>Menu</div>
            {
                menuItems.map((item, i) => {
                    return (
                        <Link href={`/${item.name}`} key={i}>
                            <div
                                className={`flex items-center gap-3 mx-1 
                                cursor-pointer hover:bg-[#242424]
                                ${pathName === `/${item.name}` ? "bg-[#242424]" : ""}
                                p-2 rounded-xl text-sm`}>
                                <span>{<item.icon />}</span>
                                <span className='capitalize'>{item.name}</span>
                                {
                                    item.name === "notifications" && notifications?.length >= 1 &&
                                    <span
                                        className='dark:bg-white dark:text-black 
                                        h-5 w-5 rounded-full flex justify-center items-center p-2'
                                    >{notificationCount?.length}</span>
                                }
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Menu