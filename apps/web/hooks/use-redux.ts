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
    setTracks
} from "@/store/slices/videoSlice";

const useRedux = () => {

    const { 
        isRecord,
        isUpload,
        isRecording,
        isRecordingInProcess,
        isRecordingFinish,
        url
    } = useSelector((state: RootState) => state.media);

    const { tracks } = useSelector((state: RootState) => state.video);
    
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
        setTracks
    };
};

export default useRedux;