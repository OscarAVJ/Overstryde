const URL = "http://localhost:4000/api/products"
const productService = {}

productService.getProducts = async (filters = {}) => {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            queryParams.set(key, value)
        }
    })

    const queryString = queryParams.toString()
    const response = await fetch(`${URL}/${queryString ? `?${queryString}` : ""}`)
    if (!response.ok) {
        throw new Error("Could not load products")
    }
    const json = await response.json()
    return json
}

productService.getProductById = async (id) => {
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) {
        throw new Error("Could not load product")
    }
    return response.json()
}

export default productService
