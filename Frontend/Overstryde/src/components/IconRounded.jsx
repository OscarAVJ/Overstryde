import React from 'react'

export const IconRounded = ({ icon }) => {
  return (
    <div className='rounded-full bg-black h-10 w-10 flex items-center justify-center'>
      <div className="text-white">
        {icon}
      </div>
    </div>
  )
}
