const URL = "http://localhost:4000/api/products"
const productService = {}

productService.getProducts = async () => {
    const response = await fetch(`${URL}/`)
    if (!response.ok) {
        throw new Error("Could not load products")
    }
    const json = await response.json()
    return json
}

export default productService
