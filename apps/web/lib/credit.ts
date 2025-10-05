const creditTrackerToPercent = (count: number, plan: string) => {
    if(plan === "Free"){
        const equalPart = 100 / 3;
        return equalPart * count;
    }
    const equalPart = 100 / 10;
    return  equalPart * count;
};

export {
    creditTrackerToPercent
};