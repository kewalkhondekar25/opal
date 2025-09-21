"use client";

import { useRef, useState } from "react";
import useRedux from "./use-redux";
import axios from "axios";

const useRecording = () => {

    const { dispatch, record, recording, setUrl, isRecording } = useRedux();
    const [videoURL, setVideoURL] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    // const [uploadId, setUploadId] = useState();
    // console.log("uploadId in state", uploadId);
    const uploadIdRef = useRef<string | null>(null)
    const fileName = `recording-${Date.now()}.webm`;
    const [partNumber, setPartNumber] = useState(1);
    console.log("partNumber", partNumber);
    const [parts, setParts] = useState<{Etag: string, PartNumber: number}[]>([]);
    
    const startMultipartUploadSession = async () => {
        try {
            const response = await axios.post("/api/start-upload", {
                fileName,
                contentType: "video/webm"
            });
            // setUploadId(response.data.data.uploadId);
            const uploadId = response.data.data.uploadId;
            console.log("generated uploadId", uploadId);
            return uploadId;
        } catch (error) {
            console.log(error);
        }
    };

    const startRecording = async () => {
        console.log("recording will start");
        const uploadId = await startMultipartUploadSession();
        uploadIdRef.current =  uploadId;

        try {
            console.log(1);
            //screen capture
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });
            console.log(2);
            //audio capture
            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });
            console.log(3);
            //combine stream
            const combineStream = new MediaStream([
                ...screenStream.getVideoTracks(),
                ...screenStream.getAudioTracks(),
                ...audioStream.getAudioTracks()
            ]);
            console.log(4);
            const mediaRecorder = new MediaRecorder(combineStream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            console.log(5);
            mediaRecorder.ondataavailable = async (event) => {
                console.log(6);
                if(event.data.size > 0){
                    console.log("chunk", event.data);
                    chunksRef.current.push(event.data);
                    //s3 upload
                    console.log("before if", uploadId);
                    if(uploadIdRef.current){
                        console.log("inside if");
                        //get
                        const response = await axios.post("/api/presigned-url", {
                            fileName,
                            uploadId: uploadIdRef.current,
                            partNumber
                        });
                        console.log("signed url res:", response.data);
                        
                        const presignedUrl = response.data.data.presignedUrl;
                        console.log("gen presignedUrl:", presignedUrl);
                        
                        console.log("put will hit");
                        //put
                        const result = await fetch(presignedUrl, {
                            method: "PUT",
                            body: event.data,
                            headers: { "Content-Type": "video/webm" }
                        });

                        console.log("signed url put res:", result);

                        const eTag = result.headers.get("etag");
                        if(eTag){
                            setParts(prev => [...prev, { Etag: eTag, PartNumber: partNumber }]);
                            setPartNumber(prev => prev + 1);
                        };
                    };
                };
            };
            console.log(7);

            mediaRecorder.onstop = () => {
                console.log(8);
                const blob = new Blob(chunksRef.current, { type: "video/webm" });
                const sizeInMb = (blob.size / (1024 * 1024)).toFixed(2);
                console.log("chunk size in mb:", sizeInMb);
                const url = URL.createObjectURL(blob);
                dispatch(setUrl(url));
                setVideoURL(url);
            };
            
            console.log(9);
            mediaRecorder.start(30000);
            dispatch(recording());

        } catch (error) {
            console.log(error);
            alert("Failed to start recording. Make sure microphone and screen access are allowed.");
        }
    };

    const stopRecording = async () => {
        console.log(10);
        if(mediaRecorderRef.current && isRecording){
            mediaRecorderRef.current.stop();
            dispatch(recording());
            dispatch(record());
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            console.log(11);
            if(uploadIdRef.current){
                console.log(12);
                console.log("upload id before complete upload", uploadIdRef.current);
                
                const response = await axios.post("/api/complete-upload", {
                    fileName,
                    uploadId: uploadIdRef.current,
                    parts
                });
                console.log("complete upload res", response);
            }
        };
    };

    return {
        startRecording,
        stopRecording,
        videoURL
    };
};

export default useRecording;