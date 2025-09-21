"use client";

import { useState, useEffect, useRef } from "react";
import useRecording from "./use-recording";

const useFiveMinuteTimer = (isActive: boolean) => {

    const [seconds, setSeconds] = useState(0);
    const { stopRecording } = useRecording();
    // const [isPaused, setIsPaused] = useState(false);
    
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isActive) {
            setSeconds(0);
            // setIsPaused(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        };

        // if (isPaused) {
        //     if (timerRef.current) clearInterval(timerRef.current);
        //     return;
        // };

        timerRef.current = window.setInterval(() => {
            setSeconds((prev) => {
                if (prev + 1 >= 5 * 60) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 5 * 60;
                }
                return prev + 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, 
        // isPaused
    ]);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, "0");
        const s = (sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // const pause = () => setIsPaused(true);
    // const resume = () => setIsPaused(false);

    return { 
        seconds, 
        formatTime, 
        // pause, resume 
    };
};

export default useFiveMinuteTimer;
