import React from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from '../ui/badge';
import { Spinner } from '../ui/spinner';

const Transcript = ({ transcript }: { transcript: string }) => {
    return (
        <section className='flex flex-col gap-3 place-self-start w-full'>
            <p className='text-sm font-bold '>Transcript</p>
            <Card className='w-full dark:bg-[#1c141a]'>
                <CardHeader>
                    <CardTitle className=''>Your Video, Your Transcript</CardTitle>
                    <CardDescription>Instant AI-generated transcripts for every video</CardDescription>
                    <CardAction></CardAction>
                </CardHeader>
                <CardContent>
                    {
                        transcript ?
                        <p className='text-sm'>{transcript}</p> :
                        <Badge><Spinner/>Generating AI Transcript…</Badge>
                    }
                </CardContent>
            </Card>
        </section>
    )
}

export default Transcript