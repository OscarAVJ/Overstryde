import { ProductCard } from '@/components/products/ProductCard'
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton';
import { useSearchParams } from "react-router-dom";
import useProducts from '@/hooks/useProducts';
import useFavorites from '@/hooks/useFavorites';
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
        search: searchParams.get("search"),
    }), [searchParams])
    const { products, isLoading, error } = useProducts(filters)
    const { isFavorite, toggleFavorite } = useFavorites()
    const searchTerm = searchParams.get("search")

    if (products.length === 0 && !isLoading && !error) {
        return (
            <div className="px-4 md:px-6 py-6">
                <h1 className="text-xl font-semibold text-gray-950">No hay productos</h1>
                <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? `No encontramos resultados para "${searchTerm}".` : "No hay productos para esta categoria."}
                </p>
            </div>
        )
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
        <main className="px-4 md:px-6 py-4">
            {searchTerm && (
                <div className="mb-4">
                    <p className="text-xs font-semibold uppercase text-amber-600">Busqueda</p>
                    <h1 className="text-2xl font-semibold text-gray-950">Resultados para "{searchTerm}"</h1>
                </div>
            )}
            <div className='grid grid-cols-2 md:grid-cols-5 gap-2 w-full'>
                {products.map(item => (
                    <ProductCard
                        key={item._id}
                        product={item}
                        isFavorite={isFavorite(item._id)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
        </main>
    )
}
