const API_URL = "http://localhost:4000/api/products";

export const getProducts = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Error obteniendo los productos.")

        }
        return await response.json();
    } catch (error) {
        throw new Error("Error con el servidor: " + error.message)
    }
}

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if(!response.ok){
            throw new Error("Error obteniendo el producto.")
        }

        return await response.json();
    } catch (error) {
        throw new Error("Error con el servidor: " + error.message)
    }

}