import productService from "@/services/productService"
import { useCallback, useEffect, useState } from "react"

const useProducts = (filters = {}) => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const filtersKey = JSON.stringify(filters)

    const loadProducts = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await productService.getProducts(JSON.parse(filtersKey))
            setProducts(response)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }, [filtersKey])

    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    return { products, isLoading, error, loadProducts }
}

export default useProducts
