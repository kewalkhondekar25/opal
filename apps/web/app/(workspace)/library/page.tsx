"use client";

import Guide from '@/components/guide/Guide';
import MediaConsole from '@/components/media/MediaConsole'
import { Separator } from '@/components/ui/separator'
import LoadingTrack from '@/components/video/LoadingTrack';
import Tracks from '@/components/video/Tracks';
import useRedux from '@/hooks/use-redux'
import { fetchTracks } from '@/service/trackService';
import { CloudUpload, Video } from 'lucide-react'
import React, { useEffect } from 'react'

const page = () => {

  const { 
    isRecording, 
    isRecordingFinish, 
    record, 
    url, 
    tracks,
    isLoading,
    dispatch, 
    setTracks,
    setIsLoading 
  } = useRedux();

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        dispatch(setIsLoading());
        const allTracks = await fetchTracks();
        console.log(allTracks.data);
        dispatch(setTracks(allTracks.data));
        dispatch(setIsLoading());
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTracks()
  }, []);
  
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
        tracks?.length < 0 ? <Guide/> : isLoading ? <LoadingTrack/> : <Tracks/>
      }

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