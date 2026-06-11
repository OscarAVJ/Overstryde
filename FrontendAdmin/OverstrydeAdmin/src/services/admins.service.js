const API_URL = "http://localhost:4000/api/admins";
const REGISTER_URL = "http://localhost:4000/api/registerAdmin";

const buildAdminFormData = (admin) => {
    const formData = new FormData();

    if (admin.name !== undefined) {
        formData.append("name", admin.name);
    }

    if (admin.last_name !== undefined) {
        formData.append("last_name", admin.last_name);
    }

    if (admin.email !== undefined) {
        formData.append("email", admin.email);
    }

    if (admin.password) {
        formData.append("password", admin.password);
    }

    if (admin.isActive !== undefined) {
        formData.append("isActive", admin.isActive);
    }

    if (admin.isVerified !== undefined) {
        formData.append("isVerified", admin.isVerified);
    }

    if (admin.loginAttempts !== undefined) {
        formData.append("loginAttempts", admin.loginAttempts);
    }

    if (admin.timeOut !== undefined && admin.timeOut !== null) {
        formData.append("timeOut", admin.timeOut);
    }

    if (admin.photo) {
        formData.append("photo", admin.photo);
    }

    return formData;
}

export const getAdmins = async () => {
    try {
        const response = await fetch(API_URL, {
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Error obteniendo los administradores.")
        }

        return await response.json();
    } catch (error) {
        throw new Error("Error con el servidor: " + error.message)
    }
}

export const getAdminById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Error obteniendo el administrador.")
        }

        return await response.json();
    } catch (error) {
        throw new Error("Error con el servidor: " + error.message)
    }
}

export const createAdmin = async (admin) => {
    const response = await fetch(REGISTER_URL, {
        method: "POST",
        credentials: "include",
        body: buildAdminFormData(admin)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error creando administrador");
    }

    return data;
}

export const verifyAdminCode = async (verificationCodeRequest) => {
    const response = await fetch(`${REGISTER_URL}/verifyCodeEmail`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationCodeRequest })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error verificando administrador");
    }

    return data;
}

export const updateAdmin = async (id, admin) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        credentials: "include",
        body: buildAdminFormData(admin)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error actualizando administrador");
    }

    return data;
}

export const deleteAdmin = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error eliminando administrador");
    }

    return data;
}
