import { ProductCard } from '@/components/products/ProductCard'
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton';
import { useSearchParams } from "react-router-dom";
import useProducts from '@/hooks/useProducts';
import { useMemo } from 'react';

export const ProductsPage = () => {
    ///Este es un hook de react native y pues con el podemos acceder a los parametros que mandamos en el path de donde hagamos el to={/asdf?asdf=asdf}
    const [searchParams] = useSearchParams()
    ///Aca obtenemos el query que hemos puesto, en este caso es category
    const filters = useMemo(() => ({
        category: searchParams.get("category"),
        subcategory: searchParams.get("subcategory") ?? searchParams.get("sub"),
        gender: searchParams.get("gender"),
        product_type: searchParams.get("product_type"),
    }), [searchParams])
    const { products, isLoading, error } = useProducts(filters)

    if (products.length === 0 && !isLoading && !error) {
        return <p className="px-4 md:px-6 py-4">No hay productos para esta categoria.</p>
    }

    if (isLoading) {
        return (
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 w-full px-4 md:px-6 py-4'>
                {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        )
    }

    if (error) {
        return <p className="px-4 md:px-6 py-4 text-red-600">No se pudieron cargar los productos.</p>
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-5 gap-2  w-full px-4 md:px-6 py-4'>
            {products.map(item => <ProductCard key={item._id} product={item} />)}
        </div>
    )
}
