import React from 'react'

export const IconRounded = ({ icon, background, iconColor}) => {
  return (
    <div className={`rounded-full ${background} h-8 w-8 flex items-center justify-center`}>
      <div className={`${iconColor} `}>
        {icon}
      </div>
    </div>
  )
}
