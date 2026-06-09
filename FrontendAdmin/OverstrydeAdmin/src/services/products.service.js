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

export const createProduct = async (product) =>{
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("fit", product.fit);
    formData.append("product_type", product.product_type);
    formData.append("gender", product.gender);
    formData.append("price", product.price);

    formData.append(
        "categories",
        JSON.stringify(product.categories)
    );
    
    formData.append(
        "variants",
        JSON.stringify(product.variants)
    );

    if (product.expiration_date) {
        formData.append(
            "expiration_date",
            product.expiration_date
        );
    }

    product.images.forEach((image) => {
        formData.append("images", image);
    });

    const response = await fetch(API_URL, {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error creando producto");
    }

    return data;
}

export const updateProduct = async (id, product) => {
    const formData = new FormData();

    if (product.name !== undefined)
        formData.append("name", product.name);

    if (product.description !== undefined)
        formData.append("description", product.description);

    if (product.fit !== undefined)
        formData.append("fit", product.fit);

    if (product.product_type !== undefined)
        formData.append("product_type", product.product_type);

    if (product.gender !== undefined)
        formData.append("gender", product.gender);

    if (product.price !== undefined)
        formData.append("price", product.price);

    if (product.categories !== undefined)
        formData.append(
            "categories",
            JSON.stringify(product.categories)
        );

    if (product.variants !== undefined)
        formData.append(
            "variants",
            JSON.stringify(product.variants)
        );

    if (product.expiration_date !== undefined)
        formData.append(
            "expiration_date",
            product.expiration_date
        );

    if (product.images?.length > 0) {
        product.images.forEach((image) => {
            formData.append("images", image);
        });
    }

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error actualizando producto");
    }

    return data;
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error eliminando producto");
    }

    return data;
};