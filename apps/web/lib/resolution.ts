const getResolution = (index: number): string => {
    switch (index){
        case 0 :
            return "360px";
        case 1:
            return "480px";
        case 2:
            return "720px";
        case 3:
            return "1080px";
        default:
            return "px"
    }
};

export { getResolution };