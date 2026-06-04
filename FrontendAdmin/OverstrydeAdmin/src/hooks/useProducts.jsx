import { useState, useEffect } from "react";
import { getProducts, getProductById } from "@/services/products.service";

const useProducts = () =>{
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    }

    useEffect(() =>{
        fetchProducts();
    }, [])

    return {
        products
    }
}

export default useProducts;