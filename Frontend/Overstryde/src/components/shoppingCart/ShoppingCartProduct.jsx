import React from 'react'
import { Separator } from '../ui/separator'
import { Stepper } from './Stepper'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

export const ShoppingCartProduct = ({ isShoppingCart }) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <div className={`flex w-full gap-x-2 ${isShoppingCart ? 'min-h-20' : 'min-h-27'}`}>        <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3ltfGVufDB8fDB8fHww" alt="" className='w-24 h-24 object-cover rounded-lg shrink-0' />
        <div className='flex flex-col flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-2'>
            <h1 className='font-bold text-lg leading-tight truncate'>
              Camisa de compresión
            </h1>
            <p className='font-bold text-lg shrink-0'>$54</p>
          </div>
          <div className='flex gap-2 font-extralight'>
            <p>Talla: L</p>
            <p>|</p>
            <p>Color: Negro</p>
          </div>
          <div className='flex mt-auto items-center gap-2'>
            <div className='w-[50%] h-auto'>
              {isShoppingCart ? <Stepper /> : "Cantidad: 4"}
            </div>
            <Button variant='outlined' className={"h-auto p-2 bg-gray-100"}> <Trash size={30} /></Button>
          </div>
        </div>
      </div>
      <Separator className={""} />
    </div>
  )
}
