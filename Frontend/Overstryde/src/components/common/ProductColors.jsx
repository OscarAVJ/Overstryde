import React from 'react'

export const ProductColors = ({color,value, onClick, onMouseEnter, onMouseLeave}) => {
  return (
    <div onClick={()=>onClick(value)} onMouseEnter={()=>onMouseEnter(value)} onMouseLeave={()=>onMouseLeave(value)} className={`${color} h-5 w-5 hover:-translate-y-0.5 duration-200`}>
    </div>
  )
}
