import { menuItems } from '@/constants/sidebar-menu'
import React from 'react'

const Menu = () => {

  return (
    <div className='flex flex-col mx-5'>
        <div className='my-3 font-semibold'>Menu</div>
        {
            menuItems.map((item, i) => {
                return(
                    <div key={i} 
                        className='flex items-center gap-3 mx-1 
                        cursor-pointer hover:bg-[#242424]
                        p-2 rounded-xl text-sm'>
                        <span>{<item.icon/>}</span>
                        <span>{item.name}</span>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Menu