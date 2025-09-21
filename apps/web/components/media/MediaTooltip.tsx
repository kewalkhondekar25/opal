"use client";

import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import useRedux from '@/hooks/use-redux';

const MediaTooltip = ({ children, type, title }: { children: React.ReactNode, type: string, title: string }) => {

    const { isRecording } = useRedux();
    
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    { children }
                </TooltipTrigger>
                <TooltipContent side="bottom" className='font-semibold'>
                    { 
                        `${isRecording ? type === "record" ? "Recording in progress" : "Finish Recording" : title }` 
                    }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default MediaTooltip