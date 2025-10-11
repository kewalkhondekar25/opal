import { Squircle } from 'lucide-react'
import React from 'react'
import { AuthButton } from './AuthButton'
import Link from 'next/link'

const Navbar = () => {
    return (
        <header
            className='fixed flex justify-between top-0 right-0 left-0 
            border-b-[1px] backdrop-blur-lg p-2 z-50'>
            <div className='flex items-center'>
                <Squircle className='size-10' />
                <span className='font-semibold text-2xl'>Opal</span>
            </div>
            <Link href="/auth/sign-in">
                <AuthButton name='Sign In' />
            </Link>
        </header>
    )
}

export default Navbar