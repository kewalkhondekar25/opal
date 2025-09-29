import React from 'react'

const page = () => {
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
        </div>
    </section>
  )
}

export default page