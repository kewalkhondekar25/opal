import React, { useEffect } from 'react';
import { Progress } from '../ui/progress';
import useRedux from '@/hooks/use-redux';
import { fetchCredits } from '@/service/credit';
import { creditTrackerToPercent } from '@/lib/credit';

const PlanProgress = () => {

    const { isActive, trackCount } = useRedux();
    const plan = isActive ? "Pro" : "Free";
    
    return (
        <div className='flex flex-col gap-3 border dark:border-[#2e2f2f] rounded-lg p-3 my-10'>
            <div className='flex justify-between'>
                <p className='text-sm font-semibold'>Videos Tracker</p>
                <p className='text-sm font-semibold'>{trackCount}/{isActive ? "10" : "3"}</p>
            </div>
            <Progress value={creditTrackerToPercent(trackCount, plan)}/>
        </div>
    )
}

export default PlanProgress