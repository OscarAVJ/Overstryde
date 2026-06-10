import productService from "@/services/productService"
import { useCallback, useEffect, useState } from "react"

const useProduct = (id) => {
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadProduct = useCallback(async () => {
        if (!id) {
            setProduct(null)
            setIsLoading(false)
            return
        }

        try {
            setIsLoading(true)
            setError(null)
            const response = await productService.getProductById(id)
            setProduct(response)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }, [id])

    useEffect(() => {
        loadProduct()
    }, [loadProduct])

    return { product, isLoading, error, loadProduct }
}

export default useProduct
