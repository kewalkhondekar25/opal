"use client";

import React from 'react';
import { Button } from '../ui/button';
import { LogOut, Upload, Video } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface IHeaderButton {
    icon: React.ReactNode,
    label: string,
    className?: string,
    onClick?: () => void
};

const HeaderButton = ({ icon, label, className, onClick }: IHeaderButton) => {

    return (
        <Button
            className={`rounded-full cursor-pointer ${className || ""}`} onClick={onClick}>
            {icon}
            <span className='hidden'>{label}</span>
        </Button>


    )
};

const Header = () => {

    const router = useRouter();
    const clerk = useClerk();

    const handleLogout = async () => {
        await clerk.signOut();
        router.push("/auth/sign-in");
    };
    
    return (
        <div className='flex gap-1 p-2'>
            <HeaderButton icon={<Upload />} label='Upload' />
            <HeaderButton icon={<Video />} label='Record' />
            <HeaderButton icon={<LogOut />} label='Logout' onClick={handleLogout} />
        </div>
    )
}

export default Header