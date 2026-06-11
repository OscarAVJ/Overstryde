const API_URL = "http://localhost:4000/api/customers";
const REGISTER_URL = "http://localhost:4000/api/registerCustomers";

const buildCustomerFormData = (customer) => {
    const formData = new FormData();

    formData.append("name", customer.name);
    formData.append("last_name", customer.last_name);
    formData.append("email", customer.email);

    if (customer.password !== undefined) {
        formData.append("password", customer.password);
    }

    if (customer.addresses !== undefined) {
        formData.append("addresses", JSON.stringify(customer.addresses));
    }

    if (customer.photo) {
        formData.append("photo", customer.photo);
    }

    return formData;
}

export const getCustomers = async () => {
    try {
        const response = await fetch(API_URL, {
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Error obteniendo los customers.")
        }

        return await response.json();
    } catch (error) {
        throw new Error("Error con el servidor: " + error.message)
    }
}

export const getCustomerById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Error obteniendo el customer.")
        }

        return await response.json();
    } catch (error) {
        throw new Error("Error con el servidor: " + error.message)
    }
}

export const createCustomer = async (customer) => {
    const response = await fetch(REGISTER_URL, {
        method: "POST",
        credentials: "include",
        body: buildCustomerFormData(customer)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error creando customer");
    }

    return data;
}

export const verifyCustomerCode = async (verificationCodeRequest) => {
    const response = await fetch(`${REGISTER_URL}/verifyCodeEmail`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationCodeRequest })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error verificando customer");
    }

    return data;
}

export const updateCustomer = async (id, customer) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error actualizando customer");
    }

    return data;
}

export const deleteCustomer = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error eliminando customer");
    }

    return data;
}
