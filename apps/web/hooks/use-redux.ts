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
    setIsLoading
} from "@/store/slices/videoSlice";

import { 
    setNotification,
    updateNotification,
    setIsNotificationLoading
} from "@/store/slices/notificationSlice";

const useRedux = () => {

    const { 
        isRecord,
        isUpload,
        isRecording,
        isRecordingInProcess,
        isRecordingFinish,
        url
    } = useSelector((state: RootState) => state.media);

    const { isLoading, tracks, videos } = useSelector((state: RootState) => state.video);

    const { notifications, isNotificationLoading } = useSelector((state: RootState) => state.notifications);
    
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
        //notify
        notifications,
        isNotificationLoading,
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
        //notify
        setNotification,
        updateNotification,
        setIsNotificationLoading
    };
};

export default useRedux;