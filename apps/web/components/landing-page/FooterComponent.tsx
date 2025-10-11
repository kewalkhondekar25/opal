"use client";

import { SquircleIcon } from 'lucide-react'
import React from 'react'
import Socials from './Socials'
import { Button } from '../ui/button';
import FooterNav from './FooterNav';

const FooterComponent = () => {
  return (
    <footer 
      className='flex flex-col justify-between gap-10
      md:flex-row mt-10 sm:-mt-30'>
      <div className='flex flex-col gap-5 mt-5 mx-5 text-gray-300'>
        <div className='flex gap-1 font-semibold'>
          <SquircleIcon />
          <h3>Opal</h3>
        </div>
        <div className='font-semibold text-sm'>
          <p>Made with ❤️ by Kewal Khondekar</p>
          <p>&copy;{new Date().getFullYear()} opal</p>
        </div>
        <div>
          <Socials />
        </div>
        <div>
          <Button 
            className='rounded-full'
            variant="outline">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
            </span>
            All systems operational
          </Button>
        </div>
      </div>
      <div className='mt-5 mx-5'>
        <FooterNav/>
      </div>
    </footer>
  )
}

export default FooterComponent