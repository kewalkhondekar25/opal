"use client";

import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import useRedux from '@/hooks/use-redux';
import { Circle, Loader, Loader2, Pause } from 'lucide-react';
import useFiveMinuteTimer from '@/hooks/useFiveMin';
import MediaTooltip from './MediaTooltip';
import useRecording from '@/hooks/use-recording';

const MediaConsole = () => {
    
    const { 
        isRecord,
        isRecordingInProcess,
        isRecordingFinish,
        dispatch, 
        record, 
        isRecording, 
        recording,
        recordingProcess,
        setUrl  
    } = useRedux();
    const { startRecording, stopRecording, videoURL } = useRecording();
    // const [isLoading, setIsLoading] = useState(true);

    const handleRecording = () => {
        if(isRecording) return;
        startRecording();
        // dispatch(recording());
    };

    const handleFinishRecording = () => {
        if(isRecording){
            stopRecording();
            alert("Uploading in process. Please do not refresh browser");
        };
    };

    const { 
        formatTime, 
        seconds, 
        // pause, resume
    } = useFiveMinuteTimer(isRecording);

    useEffect(() => {
        if(seconds >= 300){
            stopRecording();
        };
    }, [seconds]);

    return (
        <section>
            <Dialog open={isRecord} onOpenChange={(open) => dispatch(record())}>
                {/* <DialogTrigger>Open</DialogTrigger> */}
                <DialogContent className='rounded-full flex items-center p-3'>
                    <DialogHeader className='flex flex-row w-full justify-center'>
                        <DialogTitle></DialogTitle>
                        <MediaTooltip 
                            type='record' 
                            title={isRecordingInProcess ? "Preparing recording..." : "Start Record"}
                        >
                            {
                                isRecordingInProcess ? 
                                    <Loader2 className="animate-spin text-red-500 w-6 h-6" /> :
                                    <Circle 
                                        className="text-red-500 cursor-pointer" 
                                        fill="currentColor"
                                        onClick={handleRecording} 
                                    />
                            }
                        </MediaTooltip>
                        <p>{formatTime(seconds)}</p>
                        <MediaTooltip 
                            type='finish'  
                            title={isRecordingFinish ? "Uploading recording..." : "Finish"}
                        >
                            {
                                isRecordingFinish ? 
                                    <Loader className="animate-spin w-6 h-6"/> :
                                    <Pause
                                        className='cursor-pointer'
                                        onClick={handleFinishRecording}
                                    />
                            }
                        </MediaTooltip>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default MediaConsole;