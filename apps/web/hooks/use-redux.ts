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

const useRedux = () => {

    const { 
        isRecord,
        isUpload,
        isRecording,
        isRecordingInProcess,
        isRecordingFinish,
        url
    } = useSelector((state: RootState) => state.media);
    
    const dispatch = useDispatch<AppDispatch>();

    return {
        isRecord,
        isUpload,
        isRecordingInProcess,
        isRecordingFinish,
        url,
        dispatch,
        upload,
        record,
        isRecording,
        recording,
        recordingProcess,
        recordingFinish,
        setUrl
    };
};

export default useRedux;