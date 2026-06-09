import { useState, useEffect } from "react";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "@/services/products.service";

const useProducts = () =>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [productId, setProductId] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        images: [],
        description: "",
        fit: "",
        product_type: "",
        gender: "",
        categories:[],
        variants: [],
        price: 0
    })

    const resetData = () =>{
        setProductId("");
        setFormData({
        name: "",
        images: [],
        description: "",
        fit: "",
        product_type: "",
        gender: "",
        categories:[],
        variants: [],
        price: 0,
        expiration_date: "",
        stock: 0
    })
    }

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally{
            setLoading(false)
        }
    }

    const getProduct = async (id) => {
    try {
        setLoading(true);
        setError("");

        const product = await getProductById(id);

        return product;
    } catch (error) {
        setError(error.message);
        throw error;
    } finally {
        setLoading(false);
    }
};

    const addProduct = async (productData) =>{
        try {
            setLoading(true);
            const result = await createProduct(productData);
            await fetchProducts();
            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false)
        }
    }

    const editProduct = async (id, productData) => {
        try {
            setLoading(true);

            const result = await updateProduct(id, productData);

            await fetchProducts();

            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeProduct = async (id) => {
        try {
            setLoading(true);

            const result = await deleteProduct(id);

            await fetchProducts();

            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() =>{
        fetchProducts();
    }, [])

    return {
        products,
        loading,
        error,
        formData,
        setFormData,
        addProduct,
        editProduct,
        removeProduct,
        getProduct,
    }
}

export default useProducts;