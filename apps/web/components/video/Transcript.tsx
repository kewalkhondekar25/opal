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
                    <p className='text-sm'>{transcript}</p>
                </CardContent>
            </Card>
        </section>
    )
}

export default Transcript