"use client";
import React, { useState } from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { Button } from '../ui/button'
import Link from 'next/link';

export function HeroScroll() {

  const [isBtnActive, setIsBtnActive] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <Link
              href="auth/sign-in">
              <Button
                onMouseEnter={() => setIsBtnActive(true)}
                onMouseLeave={() => setIsBtnActive(false)}
                id='btn-start'
                className='rounded-full mb-3'
                variant={isBtnActive ? "default" : "outline"}>Start for Free Today</Button>
            </Link>
            <h1 
              className="text-4xl font-semibold text-black dark:text-white 
              sm:text-5xl
              lg:text-6xl">
              One Video is Worth a Thousand Words.<br />
              <span 
                className="text-4xl mt-1 leading-none 
                sm:text-5xl
                lg:text-6xl">
                Transcode with Opal
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`https://res.cloudinary.com/kewalkhondekar/image/upload/v1760098144/opal/opal-landing-3_mkbkxg.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
