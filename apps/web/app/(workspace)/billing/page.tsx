"use client";

import PlanCard from '@/components/billing/card';
import ProBilling from '@/components/billing/ProBilling';
import PlanProgress from '@/components/billing/Progress';
import { cardNum } from '@/constants/plan-cards';
import useRedux from '@/hooks/use-redux';
import useToast from '@/hooks/use-toast';
import { getSession } from '@/service/payment';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';
export const dynamic = "force-dynamic";

export default function page() {
  return (
    <Suspense fallback={<div>Loading billing...</div>}>
      <BillingContent />
    </Suspense>
  );
}

const BillingContent = () => {

  const router = useRouter();
  const params = useSearchParams();
  const session_id = params.get("session_id");
  const { isActive } = useRedux();

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
    <section className='mt-10 w-screen mx-2'>
      <h1 className='text-2xl font-semibold mb-5'>Billing</h1>

      {/* Free Plan */}
      {
        !isActive ?
          (<div
            className='grid grid-cols-1 gap-3 md:grid-cols-2'>
            {
              cardNum.map((item, i) => {
                return (
                  <PlanCard key={i} item={item} />
                )
              })
            }
          </div>) :
          (
            <ProBilling/>
          )
        }
      <PlanProgress />
    </section>
  )
};