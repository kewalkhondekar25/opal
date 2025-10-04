"use client";

import { useUser } from '@clerk/nextjs';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useRedux from '@/hooks/use-redux';

const Console = () => {
    const { user } = useUser();
    const { isActive } = useRedux();

    return (
        <div className='flex justify-center items-center gap-2 text-xs font-semibold'>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
                <p>{user?.emailAddresses[0].emailAddress}</p>
                <p>{isActive ? "Pro" : "Free"} Plan</p>
            </div>
        </div>
    )
}

export default Console