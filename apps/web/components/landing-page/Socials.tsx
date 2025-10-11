import { socialIcons } from '@/lib/icons'
import Image from 'next/image'
import React from 'react'

const Socials = () => {
    return (
        <div className='flex gap-3'>
            {
                socialIcons.map((item, i) => {
                    return (
                        <div className='' key={i}>
                            <Image className='h-5 w-5 invert' src={item.icon as string} alt={item.name} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Socials