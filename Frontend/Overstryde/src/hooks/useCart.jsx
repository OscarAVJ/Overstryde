import cartService from "@/services/cartService"
import { useCallback, useEffect, useState } from "react"

const useCart = () => {
    const [cart, setCart] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadCart = useCallback(async () => {
        const cartId = cartService.getStoredCartId()

        if (!cartId) {
            setCart(null)
            setIsLoading(false)
            return null
        }

        try {
            setIsLoading(true)
            setError(null)
            const response = await cartService.getCartById(cartId)
            setCart(response)
            return response
        } catch (error) {
            cartService.clearStoredCartId()
            setCart(null)
            setError(error)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [])

    const addCartItem = useCallback(async (cartItem) => {
        const currentCart = await loadCart()
        const currentProducts = currentCart?.products || []
        const existingItem = currentProducts.find((item) => item.variantId === cartItem.variantId)
        let nextProducts

        if (existingItem) {
            nextProducts = currentProducts.map((item) => (
                item.variantId === cartItem.variantId
                    ? { ...item, quantity: item.quantity + cartItem.quantity }
                    : item
            ))
        } else {
            nextProducts = [...currentProducts, cartItem]
        }

        const payload = {
            customerId: currentCart?.customerId || "guest",
            status: currentCart?.status || "pending",
            products: cartService.toCartPayloadProducts(nextProducts),
        }
        const savedCart = currentCart?._id
            ? await cartService.updateCart(currentCart._id, payload)
            : await cartService.createCart(payload)

        setCart(savedCart)
        window.dispatchEvent(new Event("overstryde-cart-updated"))
        return savedCart
    }, [loadCart])

    const updateCartItemQuantity = useCallback(async (variantId, quantity) => {
        const currentCart = await loadCart()
        if (!currentCart) return null

        const nextProducts = currentCart.products
            .map((item) => (
                item.variantId === variantId ? { ...item, quantity } : item
            ))
            .filter((item) => item.quantity > 0)

        if (nextProducts.length === 0) {
            await cartService.deleteCart(currentCart._id)
            setCart(null)
            window.dispatchEvent(new Event("overstryde-cart-updated"))
            return null
        }

        const savedCart = await cartService.updateCart(currentCart._id, {
            customerId: currentCart.customerId || "guest",
            status: currentCart.status || "pending",
            products: cartService.toCartPayloadProducts(nextProducts),
        })

        setCart(savedCart)
        window.dispatchEvent(new Event("overstryde-cart-updated"))
        return savedCart
    }, [loadCart])

    const removeCartItem = useCallback((variantId) => (
        updateCartItemQuantity(variantId, 0)
    ), [updateCartItemQuantity])

    useEffect(() => {
        loadCart()

        const handleCartUpdate = () => {
            loadCart()
        }

        window.addEventListener("overstryde-cart-updated", handleCartUpdate)

        return () => {
            window.removeEventListener("overstryde-cart-updated", handleCartUpdate)
        }
    }, [loadCart])

    return {
        cart,
        isLoading,
        error,
        loadCart,
        addCartItem,
        updateCartItemQuantity,
        removeCartItem,
    }
}

export default useCart
