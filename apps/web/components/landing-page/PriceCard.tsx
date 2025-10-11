"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { IPrice, price } from "@/lib/price";
import { Check } from "lucide-react";

import React from 'react'
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const PriceCard = () => {

    return (
        <section className="flex flex-col justify-center items-center gap-3
        sm:flex-row sm:gap-5">
            {
                price.map((item, i) => {
                    return <PCard key={i} item={item} />
                })
            }
        </section>
    )
};

const PCard = ({ item }: { item: IPrice }) => {

    const router = useRouter();
    const handleRoute = () => {
        router.push("/billing");
    };

    return (
        <Card className="bg-black w-80">
            <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <div className="text-3xl font-bold">{item.price}</div>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
                {
                    item.features.map((item, i) => {
                        return (
                            <div key={i} className="flex justify-start items-center gap-1 text-gray-300">
                                <Check />
                                <span>{item}</span>
                            </div>
                        )
                    })
                }
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleRoute}
                    className="w-full">{item.id === "unlimited" ? 
                    "Join Waitlist" :
                    "Get Started Now"}</Button>
            </CardFooter>
        </Card>
    )
}

export default PriceCard