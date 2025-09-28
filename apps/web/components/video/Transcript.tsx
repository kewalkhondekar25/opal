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

const Transcript = () => {
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
                    <p className='text-sm'>"Welcome to the introduction of our platform. In this video, we will explore how AI-powered tools make video learning faster and more efficient. You will see how transcripts allow you to search, read, and understand every video effortlessly. By the end, you will know how to leverage these features to save time and learn smarter."</p>
                </CardContent>
            </Card>
        </section>
    )
}

export default Transcript