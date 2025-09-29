"use client";

import React from 'react';
import { Switch } from "@/components/ui/switch";
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';


const page = () => {

    const { setTheme } = useTheme();

    const handleSwitchChange = (isChecked: boolean) => {
        if (isChecked) {
            setTheme("light");
        } else {
            setTheme("dark")
        }
    }

    return (
        <section className='flex gap-1 mt-10 w-screen mx-2'>
            <h1 className='text-2xl font-semibold justify-self-start'>Settings</h1>
            <div className='flex justify-center items-center gap-1 w-full cursor-pointer'>
                <Moon className='h-4 w-4' />
                <Switch onCheckedChange={handleSwitchChange} />
                <Sun className='h-4 w-4' />
            </div>
        </section>
    )
}

export default page