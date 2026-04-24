import React from 'react'
import { Button } from '../ui/button'
import {Link} from "react-router-dom"
 
export const GenderSeparator = ({image, text,subText, path}) => {
    return (
        <div className="relative h-70 w-full overflow-hidden rounded-2xl">
            <img
                src={image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className='absolute inset-0 flex justify-center items-center'>
                <div className="max-w-xl px-6 md:px-12 flex flex-col items-center ">
                    <h1 className="text-4xl md:text-6xl font-extrabold uppercase text-white">
                        {text}
                    </h1>
                    <p className="text-sm md:text-base text-yellow-300 ">
                        {subText}
                    </p>
                    <Button asChild size="lg" className={" cursor-pointer bg-transparent border-gray-400 hover:-translate-y-0.5 border-3 text-white"}>
                        <Link to={path}>Explorar más</Link>
                    </Button>
                </div>
            </div>

        </div>
    )
}