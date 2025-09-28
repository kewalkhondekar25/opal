"use client";

import React from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button';
import Link from 'next/link';
import useRedux from '@/hooks/use-redux';

const Guide = () => {

    const cardLength = Array.from({ length: 2 }, (_, i) => i + 1);
    const { dispatch, record } = useRedux();

    return (
        <section className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl'>Hey there, ready to record?</h1>
            <div 
                className='flex flex-col mt-10 gap-5
                lg:flex-row'>
                {
                    cardLength.map((item, i) => {
                        return (
                            <Card key={i} className='w-72'>
                                <CardHeader>
                                    <CardTitle>
                                        { i === 0 ? "I want to practice" : "I'll explore on my own"}
                                    </CardTitle>
                                    <CardDescription></CardDescription>
                                    <CardAction></CardAction>
                                </CardHeader>
                                <CardContent className='flex justify-center items-center'>
                                    {
                                        i === 0 ?
                                        <img src="/practice.svg" alt="practice" /> :
                                        <img src="/explorer.svg" className='h-40' alt="explore" />
                                    }
                                </CardContent>
                                <CardFooter>
                                    {
                                        i === 0 ?
                                        <Link href="/home" >
                                            <Button className='cursor-pointer'>Start a demo</Button> 
                                        </Link> :
                                        <Button
                                            className='cursor-pointer' 
                                            onClick={() => dispatch(record())}
                                        >Start recording</Button>
                                    }
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Guide