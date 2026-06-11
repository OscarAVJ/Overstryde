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

        if (!response.ok) {
            throw new Error("Error obteniendo el producto.")
        }

        return await response.json();
    } catch (error) {
        throw new Error("Error con el servidor: " + error.message)
    }

}

export const createProduct = async (product) => {
    console.log("PRODUCT RECIBIDO:", product);

    const formData = new FormData();

    //Campos para todos los productos
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("product_type", product.product_type);
    formData.append("price", product.price);
    formData.append(
        "subCategories",
        JSON.stringify(product.subCategories)
    );
    product.images.forEach((image) => {
        formData.append("images", image.file);
    });

    //Campos para productos de ropa
    if (product.product_type === "ropa") {
        formData.append(
            "variants",
            JSON.stringify(product.variants)
        );
        formData.append("fit", product.fit);
        formData.append("gender", product.gender);
    }

    //Si se trata de un alimento
    if (product.expiration_date && product.product_type === "alimenticio") {
        formData.append(
            "expiration_date",
            product.expiration_date.toISOString()
        );
    }

    //Cuando no se trata de ropa, el stock va afuera
    if (product.product_type != "ropa") {
        formData.append("stock", product.stock)
        formData.append("gender", "accesory");
    }

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

    if (product.gender !== undefined){
        if(product.product_type !== "ropa"){
            formData.append("gender", "accesory")
        } else{
            formData.append("gender", product.gender);
        }
    }
    if (product.price !== undefined)
        formData.append("price", product.price);

    if (product.subCategories !== undefined)
        formData.append(
            "subCategories",
            JSON.stringify(product.subCategories)
        );

    if (product.variants !== undefined)
        formData.append(
            "variants",
            JSON.stringify(product.variants)
        );

    if (product.expiration_date !== undefined && product.expiration_date !== null)
        formData.append(
            "expiration_date",
            product.expiration_date.toISOString()
        );
    if (product.stock !== undefined){
        formData.append(
            "stock",
            product.stock
        )
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