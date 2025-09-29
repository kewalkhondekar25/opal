"use client";

import { useRef, useState } from "react";
import useRedux from "./use-redux";
import axios from "axios";
import { createTrack } from "@/service/trackService";
import useToast from "./use-toast";
import { createNotifications } from "@/service/notifications";

const useRecording = () => {

    const {
        isRecordingFinish,
        dispatch, 
        record, 
        recording, 
        setUrl, 
        isRecording, 
        recordingProcess,
        recordingFinish
    } = useRedux();

    const [videoURL, setVideoURL] = useState<string | null>(null);
    //"recording-userId-trackId".webm
    // const fileName = `recording-${Date.now()}.webm`;
    let fileName: string;

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const uploadIdRef = useRef<string | null>(null)
    const partNumberRef = useRef(1);
    const partsRef = useRef<{ ETag: string, PartNumber: number }[]>([]);
    const uploadPromiseRef = useRef<Promise<void>[]>([]);

    const startMultipartUploadSession = async (userId: string, trackId: string) => {
        //send trackid, userid to upload api
        fileName = `recording-${userId}-${trackId}.webm`;
        try {
            const response = await axios.post("/api/start-upload", {
                fileName,
                contentType: "video/webm"
            });
            const uploadId = response.data.data.uploadId;
            if(uploadId){
                dispatch(recordingProcess());
            };
            return uploadId;
        } catch (error) {
            console.log(error);
        }
    };

    const startRecording = async () => {

        dispatch(recordingProcess());
        const { userId, trackId } = await createTrack();

        const uploadId = await startMultipartUploadSession(userId, trackId);
        uploadIdRef.current = uploadId;

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

            mediaRecorder.ondataavailable = async (event) => {

                if(event.data.size > 0){
                    
                    chunksRef.current.push(event.data);
                    //s3 upload
                    if (uploadIdRef.current) {
                        const partNumberCopy = partNumberRef.current;
                        partNumberRef.current += 1;

                        const promise = (async () => {
                            //get
                            const response = await axios.post("/api/presigned-url", {
                                fileName,
                                uploadId: uploadIdRef.current,
                                partNumber: partNumberCopy
                            });
                            const presignedUrl = response.data.data.presignedUrl;
                            
                            //put
                            const result = await fetch(presignedUrl, {
                                method: "PUT",
                                body: event.data,
                                headers: { "Content-Type": "video/webm" }
                            });

                            const eTag = result.headers.get("etag");
                            if (eTag) {
                                partsRef.current.push({ ETag: eTag.replace(/"/g, ""), PartNumber: partNumberCopy });
                            };
                        })();

                        uploadPromiseRef.current.push(promise);
                    };
                };
            };

            mediaRecorder.onstop = async () => {
                useToast("Uploading in progress");
                dispatch(recordingFinish());
                await Promise.all(uploadPromiseRef.current);
                await createNotifications("Your video is queued", "Transcoding will start soon")
                dispatch(recordingFinish());

                if(uploadIdRef.current){

                    const orderedParts = partsRef.current.sort((a, b) => a.PartNumber - b.PartNumber);

                    const response = await axios.post("/api/complete-upload", {
                        fileName,
                        uploadId: uploadIdRef.current,
                        parts: orderedParts
                    });
                    console.log("complete upload res:", response);
                    if(response.status === 200){
                        useToast("Added to Queue");
                    }
                };

                const blob = new Blob(chunksRef.current, { type: "video/webm" });
                const sizeInMb = (blob.size / (1024 * 1024)).toFixed(2);
                console.log("chunk size in mb:", sizeInMb);
                const url = URL.createObjectURL(blob);
                dispatch(setUrl(url));
                setVideoURL(url);
            };

            mediaRecorder.start(30000);
            dispatch(recording());

        } catch (error) {
            console.log(error);
            alert("Failed to start recording. Make sure microphone and screen access are allowed.");
        }
    };

    const stopRecording = async () => {
        const blob = new Blob(chunksRef.current);
        if(blob.size < (5 * 1024 * 1024)){
            return alert("Recording must reach 5 MB before it can be uploaded. Please continue.");
        };
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