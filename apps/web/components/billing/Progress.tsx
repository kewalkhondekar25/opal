import React from 'react';
import { Progress } from '../ui/progress';
import useRedux from '@/hooks/use-redux';

const PlanProgress = () => {

    const { isActive } = useRedux();
    
    return (
        <div className='flex flex-col gap-3 border dark:border-[#2e2f2f] rounded-lg p-3 my-10'>
            <div className='flex justify-between'>
                <p className='text-sm font-semibold'>Videos Tracker</p>
                <p className='text-sm font-semibold'>0/{isActive ? "10" : "3"}</p>
            </div>
            <Progress value={30}/>
        </div>
    )
}

export default PlanProgress