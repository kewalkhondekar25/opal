"use client";

import { manageBilling } from '@/service/payment';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import useRedux from '@/hooks/use-redux';

const ProBilling = () => {

    const [isClick, setIsClick] = useState(false);
    const { subscriptionStatus } = useRedux();

    const handleManageClick = async () => {
        setIsClick(true);
        try {
            const response = await manageBilling();
            window.location.href = response
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col gap-5 dark:bg-[#171717] mt-5 p-3 rounded-lg w-full'>
            <div className='[&>p:first-child]:text-xl [&>p:nth-child(2)]:text-sm'>
                <p>Current Plan</p>
                <p className='font-semibold'>Pro</p>
            </div>
            <div className='[&>p:first-child]:text-xl [&>p:nth-child(2)]:text-sm'>
                <p>Status</p>
                <div className='flex items-center gap-2'>
                    <p className='capitalize'>{subscriptionStatus}</p>
                    <div 
                        className={`h-3 w-3 
                        ${subscriptionStatus === "active" ? "bg-green-500" : 
                        subscriptionStatus === "canceled" ? "bg-red-500": "bg-red-500"}  rounded-full animate-pulse`}></div>
                </div>
            </div>
            <div className='[&>p:first-child]:text-xl [&>p:nth-child(2)]:text-sm'>
                <p>Your Payment</p>
                <p>$ 10/Month</p>
            </div>
            <Button
                className='cursor-pointer md:place-self-center md:w-sm'
                onClick={handleManageClick}
                disabled={isClick}
            >Manage Billing
                {isClick && <Spinner />}
            </Button>
        </div>
    )
}

export default ProBilling