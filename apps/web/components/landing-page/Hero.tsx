"use client";

import React, { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link';
import { HeroScroll } from './HeroScroll';

const Hero = () => {

    const [isBtnActive, setIsBtnActive] = useState(false);

    return (
        <section
            className='flex flex-col justify-center items-center gap-1 mx-2'>
            {/* <Link
                className='mt-52' 
                href="auth/sign-in">
                <Button
                    onMouseEnter={() => setIsBtnActive(true)}
                    onMouseLeave={() => setIsBtnActive(false)}
                    id='btn-start'
                    className='rounded-full'
                    variant={isBtnActive ? "default" : "outline"}>Start for Free Today</Button>
            </Link>
            <div
                className='relative text-center
                [&>h1]:text-3xl [&>h1]:font-semibold 
                [&>h2]:text-3xl [&>h2]:font-semibold'
            >
                <div
                    className='absolute w-full h-full
                    bg-gradient-to-t from-[#0a0a0a]/75 to-white/0'></div>
                <h1>Transcode Your Video With Opal</h1>
            </div> */}
            <HeroScroll />
        </section>
    )
}

export default Hero