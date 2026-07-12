import favoritesService from "@/services/favoritesService";
import { useAuth } from "@/hooks/useAuth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const getProductsFromFavoriteList = (favoriteList) =>
    favoriteList?.products
        ?.map((item) => item.productId)
        .filter(Boolean) || [];

const useFavorites = () => {
    const { user, isLoading: isAuthLoading } = useAuth();
    const navigate = useNavigate();
    const [favoriteList, setFavoriteList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const isLoggedIn = Boolean(user?._id);

    const favoriteProducts = useMemo(
        () => getProductsFromFavoriteList(favoriteList),
        [favoriteList]
    );

    const favoriteProductIds = useMemo(
        () => new Set(favoriteProducts.map((product) => product._id)),
        [favoriteProducts]
    );

    const loadFavorites = useCallback(async () => {
        if (isAuthLoading) return;

        if (!isLoggedIn) {
            setFavoriteList(null);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const response = await favoritesService.getMyFavorites();
            setFavoriteList(response);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [isAuthLoading, isLoggedIn]);

    useEffect(() => {
        loadFavorites();
    }, [loadFavorites]);

    const isFavorite = useCallback(
        (productId) => favoriteProductIds.has(productId),
        [favoriteProductIds]
    );

    const toggleFavorite = useCallback(async (productId) => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        try {
            setError(null);
            const response = isFavorite(productId)
                ? await favoritesService.removeFavorite(productId)
                : await favoritesService.addFavorite(productId);
            setFavoriteList(response.favorites);
        } catch (error) {
            setError(error);
        }
    }, [isFavorite, isLoggedIn, navigate]);

    return {
        favoriteList,
        favoriteProducts,
        favoriteProductIds,
        isLoading,
        isAuthLoading,
        isLoggedIn,
        error,
        isFavorite,
        toggleFavorite,
        loadFavorites,
    };
};

export default useFavorites;
