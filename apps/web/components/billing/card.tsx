"use client";

import React, { useState } from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '../ui/button';
import { checkout } from '@/service/payment';
import { Spinner } from '../ui/spinner';

interface IPlanCard {
    id: number;
    title: string;
    subTitle: string;
    credits: number;
    price: number
};

const PlanCard = ({ item }: { item: IPlanCard }) => {

    const [isClick, setIsClick] = useState(false);
    const handlePurchase = async (title: string) => {
        setIsClick(true);
        try {
            const response = await checkout();
            window.location.href = response?.url;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{item?.title}</CardTitle>
                <CardDescription>{item?.subTitle}</CardDescription>
            </CardHeader>
            <CardContent className='flex justify-between text-sm font-semibold'>
                <p>{item?.credits} Videos</p>
                <p>${item?.price}/month</p>
            </CardContent>
            <CardFooter>
                <Button
                    className='w-full cursor-pointer'
                    disabled={item.title === "Free" || item.title === "Pro" && isClick }
                    onClick={(e) => handlePurchase(item.title)}
                >
                    {item.title === "Free" ? "Active" : "Purchase"}
                    {isClick && <Spinner/>}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default PlanCard