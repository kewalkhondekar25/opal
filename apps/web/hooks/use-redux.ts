import { AppDispatch, RootState, store } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { upload, record } from "@/store/slices/mediaSlice";

const useRedux = () => {

    const { 
        isRecord,
        isUpload
    } = useSelector((state: RootState) => state.media);
    
    const dispatch = useDispatch<AppDispatch>();

    return {
        isRecord,
        isUpload,
        upload,
        record,
        dispatch
    };
};

export default useRedux;