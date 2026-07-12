import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import useFavorites from "@/hooks/useFavorites";
import { Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

export const FavoritesPage = () => {
    const {
        favoriteProducts,
        isLoading,
        isAuthLoading,
        isLoggedIn,
        error,
        isFavorite,
        toggleFavorite,
    } = useFavorites();

    if (!isAuthLoading && !isLoggedIn) {
        return (
            <main className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-4 py-10">
                <section className="w-full rounded-lg border bg-white p-8 text-center shadow-sm">
                    <Heart className="mx-auto size-10 text-gray-400" />
                    <h1 className="mt-3 text-2xl font-semibold text-gray-950">Inicia sesion para ver tus favoritos</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Guarda productos que te gusten y vuelve a ellos cuando quieras comprar.
                    </p>
                    <Button asChild className="mt-5">
                        <NavLink to="/login">Iniciar sesion</NavLink>
                    </Button>
                </section>
            </main>
        );
    }

    if (isLoading || isAuthLoading) {
        return (
            <div className="grid grid-cols-2 gap-2 px-4 py-4 md:grid-cols-5 md:px-6">
                {Array.from({ length: 5 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="px-4 py-6 text-red-600">No se pudieron cargar tus favoritos.</p>;
    }

    if (favoriteProducts.length === 0) {
        return (
            <main className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-4 py-10">
                <section className="w-full rounded-lg border bg-white p-8 text-center shadow-sm">
                    <Heart className="mx-auto size-10 text-gray-400" />
                    <h1 className="mt-3 text-2xl font-semibold text-gray-950">Aun no tienes favoritos</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Marca productos con el corazon para guardarlos aqui.
                    </p>
                    <Button asChild className="mt-5">
                        <NavLink to="/products">Explorar productos</NavLink>
                    </Button>
                </section>
            </main>
        );
    }

    return (
        <main className="px-4 py-5 md:px-6">
            <div className="mb-4">
                <p className="text-xs font-semibold uppercase text-amber-600">Favoritos</p>
                <h1 className="text-2xl font-semibold text-gray-950">Tus productos guardados</h1>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                {favoriteProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        isFavorite={isFavorite(product._id)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
        </main>
    );
};
