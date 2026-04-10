import { ProductCard } from '@/components/ProductCard'
import { useSearchParams } from "react-router-dom";
import React from 'react'
import { products } from '@/data/productsData';

export const ProductsPage = () => {
    ///Este es un hook de react native y pues con el podemos acceder a los parametros que mandamos en el path de donde hagamos el to={/asdf?asdf=asdf}
    const [searchParams] = useSearchParams()
    ///Aca obtenemos el query que hemos puesto, en este caso es category
    const filter = searchParams.get("category");
    const filterdData = products.filter((item) => item.category === filter)
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2  w-full px-4 md:px-6 py-14'>
            {filterdData.map(item => <ProductCard key={item.id} product={item} />)}
        </div>
    )
}
