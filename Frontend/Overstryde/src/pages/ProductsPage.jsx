import { ProductCard } from '@/components/products/ProductCard'
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton';
import { useSearchParams } from "react-router-dom";
import useProducts from '@/hooks/useProducts';

export const ProductsPage = () => {
    ///Este es un hook de react native y pues con el podemos acceder a los parametros que mandamos en el path de donde hagamos el to={/asdf?asdf=asdf}
    const [searchParams] = useSearchParams()
    const { products, isLoading, error } = useProducts()
    ///Aca obtenemos el query que hemos puesto, en este caso es category
    const filter = searchParams.get("category");
    const categoryMap = {
        hombres: "male",
        mujeres: "female",
        accesorios: "accesories",
    }
    const category = categoryMap[filter] ?? filter
    const filteredData = !category
        ? products
        : category === "accesories"
            ? products.filter((item) => !item.gender)
            : products.filter((item) => item.gender === category)

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
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2  w-full px-4 md:px-6 py-4'>
            {filteredData.map(item => <ProductCard key={item._id} product={item} />)}
        </div>
    )
}
