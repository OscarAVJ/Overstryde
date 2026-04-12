import React from 'react'
import { ShoppingCartProduct } from './ShoppingCartProduct'

export const ShoppingCart = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <ShoppingCartProduct />
      <ShoppingCartProduct />
      <ShoppingCartProduct />
      <ShoppingCartProduct />
      <ShoppingCartProduct />
    </div>
  )
}
