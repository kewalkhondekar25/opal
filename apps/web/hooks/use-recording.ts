"use client";

import { useRef, useState } from "react";
import useRedux from "./use-redux"

const useRecording = () => {

    const { dispatch, record, recording, setUrl, isRecording } = useRedux();
    const [videoURL, setVideoURL] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            //screen capture
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });

            //audio capture
            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });

            //combine stream
            const combineStream = new MediaStream([
                ...screenStream.getVideoTracks(),
                ...screenStream.getAudioTracks(),
                ...audioStream.getAudioTracks()
            ]);

            const mediaRecorder = new MediaRecorder(combineStream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if(event.data.size > 0){
                    console.log("chunk", event.data);
                    chunksRef.current.push(event.data);
                    //s3 upload
                };
            };
            
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "video/webm" });
                const url = URL.createObjectURL(blob);
                dispatch(setUrl(url));
                setVideoURL(url);
            };
            
            mediaRecorder.start(1000);
            dispatch(recording());

        } catch (error) {
            console.log(error);
            alert("Failed to start recording. Make sure microphone and screen access are allowed.");
        }
    };

    const stopRecording = async () => {
        if(mediaRecorderRef.current && isRecording){
            mediaRecorderRef.current.stop();
            dispatch(recording());
            dispatch(record());
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        };
    };

    return {
        startRecording,
        stopRecording,
        videoURL
    };
};

export default useRecording;