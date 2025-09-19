"use client";

import React from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const page =  () => {

  const router = useRouter();
  const { user } = useUser();
  const clerk = useClerk();
  
  const handleSignout = async () => {
    await clerk.signOut();
    router.push("/auth/sign-in");
  }

  return (
    <section className='relative min-h-screen flex justify-center items-center'>
      <div>{user?.emailAddresses[0].emailAddress}</div>
      <Button 
        className='absolute top-0 right-0 cursor-pointer'
        onClick={handleSignout}>Sign Out</Button>
    </section>
  )
}

export default page