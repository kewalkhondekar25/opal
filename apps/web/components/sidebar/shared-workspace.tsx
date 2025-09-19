import { sharedWorkspacesItems } from '@/constants/shared-workspaces'
import React from 'react'

const SharedWorkspace = () => {
    return (
        <div className='flex flex-col mx-5'>
            <div className='my-3 font-semibold'>Shared Workspaces</div>
            <div className='relative'>
                <div className="absolute h-1/2 w-full bg-gradient-to-b from-[#171717]/75 to-white/0"></div>
                {
                    sharedWorkspacesItems.map((item, i) => {
                        return (
                            <div key={i} className='flex items-center gap-3'>
                                <span className='bg-white text-black px-2.5 py-0.5 my-1 rounded-lg'>{item.name.charAt(0)}</span>
                                <span className='text-sm'>{item.name}</span>
                            </div>
                        )
                    })
                }
                <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-[#171717]/75 to-white/0"></div>
            </div>
        </div>
    )
}

export default SharedWorkspace