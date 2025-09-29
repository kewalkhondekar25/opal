"use client";

import Guide from '@/components/guide/Guide';
import MediaConsole from '@/components/media/MediaConsole'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator'
import LoadingTrack from '@/components/video/LoadingTrack';
import Tracks from '@/components/video/Tracks';
import useRedux from '@/hooks/use-redux'
import { fetchTracks } from '@/service/trackService';
import { ChevronLeft, ChevronRight, CloudUpload, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 6;

  useEffect(() => {
    const fetchAllTracks = async (page: number, limit: number) => {
      try {
        dispatch(setIsLoading());
        const allTracks = await fetchTracks(page, limit);
        console.log(allTracks.data.tracks);
        dispatch(setTracks(allTracks.data.tracks));
        dispatch(setIsLoading());
        setPage(allTracks?.data?.page);
        setTotalPages(allTracks?.data?.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTracks(page, limit);
  }, [page]);

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
        tracks?.length < 0 ? <Guide /> : isLoading ? <LoadingTrack /> : <Tracks />
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
        isLoading ? "" :
        <div className='flex justify-center items-center gap-1 my-3 *:cursor-pointer'>
          <Button
            onClick={() => setPage(prev => prev - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft />
          </Button>
          <div className='*:font-normal'>
            <span>Page</span> {page}
            <span> of</span> {totalPages}
          </div>
          <Button
            disabled={page <= totalPages}
            onClick={() => setPage(prev => prev + 1)}>
            <ChevronRight />
          </Button>
        </div>
      }

      {/* {
        url !== "" && <video src={url} controls style={{ width: "80%", maxWidth: "600px" }} />
      } */}
    </section>
  )
}

export default page