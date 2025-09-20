import MediaConsole from '@/components/media/MediaConsole'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const page = () => {
  return (
    <section className='relative min-h-screen w-screen flex flex-col gap-5'>
      <div className='flex flex-col justify-start items-start gap-3 mt-10'>
        <h1 className='text-3xl font-semibold'>My Library</h1>
      </div>
      <Separator/>
      <div>
        <MediaConsole/>
      </div>
    </section>
  )
}

export default page