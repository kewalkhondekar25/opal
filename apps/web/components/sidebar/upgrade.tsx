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
import { checkout } from '@/service/payment';

const Upgrade = () => {

    const handleUpgrade = async () => {
        try {
            const response = await checkout();
            window.location.href = response?.url;        
        } catch (error) {
            console.log(error);
            
        }
    };
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
                    <Button 
                        className='w-full'
                        onClick={handleUpgrade}>Upgrade</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Upgrade