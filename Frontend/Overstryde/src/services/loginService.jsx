import { API_URL } from "./apiConfig";

const URL = `${API_URL}/loginCustomer`;

const loginService = {};

loginService.login = async (credentials) => {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Error al iniciar sesión"
        );
    }

    return data;
};

export default loginService;
