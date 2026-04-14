import { Star } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { ProductColors } from '@/components/common/ProductColors'
import { Button } from '@/components/ui/button'
import { products } from '@/data/productsData'
import { ProductCarouselMovile } from '@/components/products/ProductCarouselMovile'

const productsMovile = Array(4).fill(products[0]);
export const SingleProductView = ({ principalColor }) => {
  const [selectedColor, setSelectedColor] = useState(principalColor);
  return (
    <div className='flex flex-col justify-center px-4 mx-auto pt-15 md:flex-row md:max-w-6xl w-full gap-3'>
      <div className='flex-col items-center gap-2 hidden sm:flex'>
        <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3ltfGVufDB8fDB8fHww" alt="" className='w-85 h-120 rounded-lg' />
        <div className='grid grid-cols-4 gap-2'>
          {Array.from({ length: 4 }, () => <img src={products[0].image} alt="" className='w-30 h-40 rounded-lg' />)}
        </div>
      </div>
      <div className='sm:hidden'>
        <ProductCarouselMovile products={productsMovile} />
      </div>
      <div className='flex flex-col gap-2 w-auto md:w-140'>
        <h1 className='uppercase'>006-Camisa de compresión OVERSTRYDE</h1>
        <div className='flex'>
          <Star size={16} color="#000000" /><Star size={16} color="#000000" /><Star size={16} color="#000000" />
          <Star size={16} color="#000000" /><Star size={16} color="#000000" />
        </div>
        <Separator></Separator>
        <p>Color: {selectedColor}</p>
        <div className='flex gap-2'>
          <ProductColors value={"Negro"} color={"bg-black"} onClick={setSelectedColor} onMouseEnter={setSelectedColor} onMouseLeave={setSelectedColor} />
          <ProductColors value={"Rojo"} color={"bg-red-500"} onClick={setSelectedColor} onMouseEnter={setSelectedColor} onMouseLeave={setSelectedColor} />
          <ProductColors value={"Azul"} color={"bg-blue-500"} onClick={setSelectedColor} onMouseEnter={setSelectedColor} onMouseLeave={setSelectedColor} />
        </div>
        <Button>Agregar al carrito</Button>
        <Separator></Separator>
        <p>Descripción </p>
        <p>
          Qui veniam dolore quis qui. Ut ullamco qui consectetur pariatur. Amet aute qui ad tempor aliqua id ipsum excepteur fugiat qui cillum magna incididunt. Amet adipisicing ex ea tempor aute est officia ullamco excepteur Lorem. Pariatur id exercitation eu consequat sit aute consequat esse ad incididunt irure nostrud. Incididunt aute elit dolore eu mollit labore proident magna.
        </p>
        <h1>Fit: Slim</h1>
        <h1>Material: 100% Algodon</h1>

      </div>
    </div>
  )
}
