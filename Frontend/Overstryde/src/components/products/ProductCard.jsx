import React, { useState } from 'react'
import { IconRounded } from '../common/IconRounded'
import { Heart } from 'lucide-react'

const colors = ["bg-black", "bg-yellow-400", "bg-pink-400", "bg-red-400"]
export const ProductCard = ({product}) => {
    const [isFav, setFav] = useState()

    return (
        <>
            <div className=' h-96 md:h-125 w-full  md:w-64 flex flex-col'>
                <div className="relative gap-2 w-full h-96 md:w-64">
                    <img src={product.image} alt="" className="absolute inset-0 h-full w-full object-cover rounded-lg" />
                    <div className='absolute right-3 top-2 hover:-translate-y-0.5 duration-150' onClick={() => setFav(!isFav)}>
                        <IconRounded icon={isFav ? <svg fill="#DC143C" width="25" height="30" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                            <path d="M236.02344,92c0,30.56494-17.71387,62.00488-52.64844,93.44629A317.34027,317.34027,0,0,1,131.93262,222.98a8.00089,8.00089,0,0,1-7.81836,0C119.86426,220.6001,20.02344,163.86279,20.02344,92a60.02029,60.02029,0,0,1,108-36.04053A60.02029,60.02029,0,0,1,236.02344,92Z" />
                        </svg> : <Heart />} background={"bg-white"} iconColor={"text-black"} />
                    </div>
                </div>
                <div className='px-1'>
                    <div className="flex flex-col justify-center items-start gap-y-1 mt-2">
                        <p className='uppercase text-sm font-medium'>{product.name}</p>
                        <p className='text-sm'>{product.category}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-bold'>
                            ${product.price}
                        </p>
                        <p className='font-medium underline'>
                            Ordenar
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
