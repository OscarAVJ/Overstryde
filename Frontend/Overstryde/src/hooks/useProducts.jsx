import productService from "@/services/productService"
import { useCallback, useEffect, useState } from "react"

const useProducts = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadProducts = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await productService.getProducts()
            setProducts(response)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    return { products, isLoading, error, loadProducts }
}

export default useProducts
