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

const Upgrade = () => {
    return (
        <div className='flex justify-center items-center mx-5'>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-sm'>Upgrade to Pro</CardTitle>
                    <CardDescription>Unlock AI features like transcription, AI summary and more</CardDescription>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter>
                    <Button className='w-full'>Upgrade</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Upgrade