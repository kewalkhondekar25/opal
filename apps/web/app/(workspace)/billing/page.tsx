"use client";

import { Button } from '@/components/ui/button';
import useToast from '@/hooks/use-toast';
import { getSession, manageBilling } from '@/service/payment';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const session_id = params.get("session_id");

  const handleManageClick = async () => {
    try {
      const response = await manageBilling();
      window.location.href = response
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (session_id) {
      const fetchSession = async (session_id: string) => {
        try {
          const response = await getSession(session_id);
          console.log(response);
          if (response?.payment_status === "paid") {
            useToast("Payment successfull");
            router.replace("/billing")
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchSession(session_id)
    }
  }, [session_id]);

  return (
    <section className='flex flex-col justify-start items-center mt-10 w-screen mx-2'>
      <h1 className='text-2xl font-semibold self-start'>Billing</h1>
      <div className='flex flex-col gap-5 dark:bg-[#171717] mt-5 p-3 rounded-lg w-full'>
        <div className='[&>p:first-child]:text-xl [&>p:nth-child(2)]:text-sm'>
          <p>Current Plan</p>
          <p>FREE</p>
        </div>
        <div className='[&>p:first-child]:text-xl [&>p:nth-child(2)]:text-sm'>
          <p>Your Payment History</p>
          <p>$ 10/Month</p>
        </div>
        <Button onClick={handleManageClick}>Manage</Button>
      </div>
    </section>
  )
}

export default page