"use client";

import MediaConsole from '@/components/media/MediaConsole'
import { Separator } from '@/components/ui/separator'
import useRedux from '@/hooks/use-redux'
import { CloudUpload, Video } from 'lucide-react'
import React from 'react'

const page = () => {
  const { isRecording, isRecordingFinish, record, url, dispatch } = useRedux();
  return (
    <section className='relative min-h-screen w-screen flex flex-col gap-5'>
      <div className='flex flex-col justify-start items-start gap-3 mt-10'>
        <h1 className='text-3xl font-semibold'>My Library</h1>
      </div>
      <Separator />
      <div>
        <MediaConsole />
      </div>
      {
        isRecording && <Video
          onClick={() => dispatch(record())}
          className='absolute bottom-3 right-3 size-5 animate-ping cursor-pointer' 
        />
      }
      {
        isRecordingFinish && <CloudUpload
          onClick={() => dispatch(record())}
          className='absolute bottom-3 right-3 size-5 animate-ping cursor-pointer' 
        />
      }
      {
        url !== "" && <video src={url} controls style={{ width: "80%", maxWidth: "600px" }} />
      }
    </section>
  )
}

export default page