import React, { useState } from 'react'
import { IconRounded } from '../common/IconRounded'
import { Heart } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export const ProductCard = ({ product }) => {
    const [isFav, setFav] = useState(false)
    const firstSubCategory = product.subCategories?.[0]
    const categoryName = firstSubCategory?.category?.name || firstSubCategory?.name

    return (
        <div className=' w-full max-w-75 flex flex-col gap-3'>
            
            {/* Imagen */}
            <div className="relative w-full aspect-3/4 overflow-hidden rounded-xl bg-gray-100">
                <NavLink to={`/singleProduct/${product._id}`}>
                    <img
                        src={product.images[0].path}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 duration-300"
                    />
                </NavLink>
                <div
                    className='absolute right-3 top-3 hover:-translate-y-0.5 duration-150 z-10'
                    onClick={() => setFav(!isFav)}
                >
                    <IconRounded
                        icon={
                            isFav ? (
                                <svg
                                    fill="#DC143C"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 256 256"
                                    id="Flat"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M236.02344,92c0,30.56494-17.71387,62.00488-52.64844,93.44629A317.34027,317.34027,0,0,1,131.93262,222.98a8.00089,8.00089,0,0,1-7.81836,0C119.86426,220.6001,20.02344,163.86279,20.02344,92a60.02029,60.02029,0,0,1,108-36.04053A60.02029,60.02029,0,0,1,236.02344,92Z" />
                                </svg>
                            ) : (
                                <Heart size={20} />
                            )
                        }
                        background={"bg-white"}
                        iconColor={"text-black"}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-2 px-1'>
                
                <div className="flex flex-col">
                    <p className='uppercase text-sm font-semibold line-clamp-1'>
                        {product.name}
                    </p>
                    <p className='text-sm text-gray-500 line-clamp-1'>
                        {categoryName}
                    </p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='font-bold text-lg'>
                        ${product.price}
                    </p>

                    <NavLink to={`/singleProduct/${product._id}`}>
                        <p className='font-medium underline text-sm'>
                            Ordenar
                        </p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
