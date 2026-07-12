import { API_URL } from "./apiConfig";

const URL = `${API_URL}/registerCustomers`;

const registerService = {};

registerService.register = async (customerData) => {

    const formData = new FormData();

    formData.append("name", customerData.name);
    formData.append("last_name", customerData.last_name);
    formData.append("email", customerData.email);
    formData.append("password", customerData.password);

    formData.append(
        "addresses",
        JSON.stringify(customerData.addresses || [])
    );

    if (customerData.photo) {
        formData.append(
            "photo",
            customerData.photo
        );
    }

    const response = await fetch(URL, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Error al registrarse"
        );
    }

    return data;
};

registerService.verifyCode = async (code) => {

    const response = await fetch(
        `${URL}/verifyCodeEmail`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                verificationCodeRequest: code,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Código inválido"
        );
    }

    return data;
};

export default registerService;
