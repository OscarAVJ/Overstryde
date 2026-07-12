import { API_URL } from "./apiConfig";

const getErrorMessage = async (response, fallbackMessage) => {
    try {
        const json = await response.json();
        return json.message || json.info || fallbackMessage;
    } catch {
        return fallbackMessage;
    }
};

const favoritesService = {};

favoritesService.getMyFavorites = async () => {
    const response = await fetch(`${API_URL}/favorites/me`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudieron cargar los favoritos"));
    }

    return response.json();
};

favoritesService.addFavorite = async (productId) => {
    const response = await fetch(`${API_URL}/favorites/me/products/${productId}`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo agregar a favoritos"));
    }

    return response.json();
};

favoritesService.removeFavorite = async (productId) => {
    const response = await fetch(`${API_URL}/favorites/me/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo quitar de favoritos"));
    }

    return response.json();
};

export default favoritesService;
