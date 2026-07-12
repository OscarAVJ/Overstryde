import { API_URL } from "./apiConfig";

const getErrorMessage = async (response, fallbackMessage) => {
    try {
        const json = await response.json();
        return json.message || fallbackMessage;
    } catch {
        return fallbackMessage;
    }
};

const customerService = {};

customerService.getCurrentCustomer = async () => {
    const response = await fetch(`${API_URL}/customers/me`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo cargar el perfil"));
    }

    return response.json();
};

customerService.addAddress = async (address) => {
    const response = await fetch(`${API_URL}/customers/me/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(address),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo guardar la direccion"));
    }

    return response.json();
};

customerService.updateProfile = async (profile) => {
    const response = await fetch(`${API_URL}/customers/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profile),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo actualizar el perfil"));
    }

    return response.json();
};

customerService.updateAddress = async (addressId, address) => {
    const response = await fetch(`${API_URL}/customers/me/addresses/${addressId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(address),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo actualizar la direccion"));
    }

    return response.json();
};

customerService.deleteAddress = async (addressId) => {
    const response = await fetch(`${API_URL}/customers/me/addresses/${addressId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "No se pudo eliminar la direccion"));
    }

    return response.json();
};

export default customerService;
