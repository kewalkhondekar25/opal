"use client";

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import useRedux from '@/hooks/use-redux';
import { Circle, Pause } from 'lucide-react';

const MediaConsole = () => {
    const { isRecord, dispatch, record } = useRedux();
    return (
        <section>
            <Dialog open={isRecord} onOpenChange={(open) => dispatch(record())}>
                {/* <DialogTrigger>Open</DialogTrigger> */}
                <DialogContent className='rounded-full flex items-center p-3'>
                    <DialogHeader className='flex flex-row w-full justify-center'>
                        <DialogTitle></DialogTitle>
                        <Circle 
                            className="text-red-500 cursor-pointer" 
                            fill="currentColor"
                            onClick={() => alert("clicked")} 
                        />
                        00:00
                        <Pause/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default MediaConsole