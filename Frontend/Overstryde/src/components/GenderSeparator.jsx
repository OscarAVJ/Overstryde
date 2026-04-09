import React from 'react'
import { Button } from './ui/button'

export const GenderSeparator = () => {
    return (
        <div className="relative h-70 w-full overflow-hidden rounded-2xl">
            <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className='absolute inset-0 flex justify-center items-center'>
                <div className="max-w-xl px-6 md:px-12 flex flex-col items-center ">
                    <h1 className="text-4xl md:text-6xl font-extrabold uppercase text-white">
                        Para él
                    </h1>
                    <p className="text-sm md:text-base text-yellow-300 ">
                        Ropa masculina
                    </p>
                    <Button size="lg" className={" cursor-pointer bg-transparent border-gray-400 hover:-translate-y-0.5 border-3 text-white"}>Explorar más</Button>
                </div>
            </div>

        </div>
    )
}