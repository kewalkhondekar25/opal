const convertTime = (timeStamp: string) => {

    const date = new Date(timeStamp);

    const formattedTime = new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);

    return formattedTime;
};

export default convertTime;