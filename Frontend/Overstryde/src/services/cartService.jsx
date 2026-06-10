const URL = "http://localhost:4000/api/cart"
const CART_ID_KEY = "overstryde-cart-id"
const cartService = {}

cartService.getStoredCartId = () => localStorage.getItem(CART_ID_KEY)

cartService.setStoredCartId = (cartId) => {
    localStorage.setItem(CART_ID_KEY, cartId)
}

cartService.clearStoredCartId = () => {
    localStorage.removeItem(CART_ID_KEY)
}

cartService.getCartById = async (id) => {
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) {
        throw new Error("Could not load cart")
    }
    return response.json()
}

cartService.createCart = async (cart) => {
    const response = await fetch(`${URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
    })
    if (!response.ok) {
        throw new Error("Could not create cart")
    }
    const json = await response.json()
    cartService.setStoredCartId(json.cart._id)
    return json.cart
}

cartService.updateCart = async (id, cart) => {
    const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
    })
    if (!response.ok) {
        throw new Error("Could not update cart")
    }
    const json = await response.json()
    return json.cart
}

cartService.deleteCart = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        throw new Error("Could not delete cart")
    }
    cartService.clearStoredCartId()
    return response.json()
}

cartService.toCartPayloadProducts = (products = []) =>
    products.map((item) => {
        const product = {
            productId: item.productId?._id || item.productId,
            quantity: item.quantity,
        }

        if (item.variantId) {
            product.variantId = item.variantId
        }

        return product
    })

export default cartService
