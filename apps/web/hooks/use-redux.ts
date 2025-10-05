"use client";

import { AppDispatch, RootState, store } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { 
    upload, 
    record, 
    recording,
    recordingProcess,
    recordingFinish,
    setUrl 
} from "@/store/slices/mediaSlice";

import { 
    setTracks,
    setVideos,
    setIsLoading,
    setTitle
} from "@/store/slices/videoSlice";

import { 
    setNotification,
    updateNotification,
    setIsNotificationLoading
} from "@/store/slices/notificationSlice";

import { 
    setIsActive,
    setSubscriptionStatus,
    setCreditTrackCount,
    setNextBillingDate
} from "@/store/slices/subscribeSlice";

const useRedux = () => {

    const { 
        isRecord,
        isUpload,
        isRecording,
        isRecordingInProcess,
        isRecordingFinish,
        url
    } = useSelector((state: RootState) => state.media);

    const { isLoading, tracks, videos, title } = useSelector((state: RootState) => state.video);

    const { notifications, isNotificationLoading } = useSelector((state: RootState) => state.notifications);

    const { isActive, subscriptionStatus, trackCount, nextBillingDate } = useSelector((state: RootState) => state.subscribe);
    
    const dispatch = useDispatch<AppDispatch>();

    return {
        //media
        isRecord,
        isUpload,
        isRecordingInProcess,
        isRecordingFinish,
        url,
        //video
        tracks,
        videos,
        isLoading,
        title,
        //notify
        notifications,
        isNotificationLoading,
        //subscribe
        isActive,
        subscriptionStatus,
        trackCount,//track
        nextBillingDate,
        dispatch,
        //media
        upload,
        record,
        isRecording,
        recording,
        recordingProcess,
        recordingFinish,
        setUrl,
        //video
        setTracks,
        setVideos,
        setIsLoading,
        setTitle,
        //notify
        setNotification,
        updateNotification,
        setIsNotificationLoading,
        //subscribe
        setIsActive,
        setSubscriptionStatus,
        setCreditTrackCount,//track
        setNextBillingDate
    };
};

export default useRedux;