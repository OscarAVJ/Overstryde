const API_URL = "http://localhost:4000/api/subcategories"

export const getSubCategories = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Error obteniendo las subcategorías.")

        }
        return await response.json();
    } catch (error) {
        throw new Error("Error con el servidor: " + error.message)
    }
}