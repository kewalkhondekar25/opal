import { AppDispatch, RootState, store } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { upload, record, recording, setUrl } from "@/store/slices/mediaSlice";

const useRedux = () => {

    const { 
        isRecord,
        isUpload,
        isRecording,
        url
    } = useSelector((state: RootState) => state.media);
    
    const dispatch = useDispatch<AppDispatch>();

    return {
        isRecord,
        isUpload,
        url,
        dispatch,
        upload,
        record,
        isRecording,
        recording,
        setUrl
    };
};

export default useRedux;