import orderService from "@/services/orderService"
import { useCallback, useMemo, useState } from "react"

const COUNTRY_LABELS = {
    SV: "El Salvador",
    MX: "Mexico",
    NI: "Nicaragua",
}

const getFieldValue = (formData, fieldName) =>
    formData.get(fieldName)?.toString().trim() || ""

export const getCheckoutAddressFromForm = (formData) => {
    const countryCode = getFieldValue(formData, "country") || "SV"
    const country = COUNTRY_LABELS[countryCode] || countryCode

    return {
        country,
        address: getFieldValue(formData, "address"),
        department: getFieldValue(formData, "department"),
        city: getFieldValue(formData, "city"),
        references: getFieldValue(formData, "reference"),
        phone: getFieldValue(formData, "phoneNumber"),
        firstName: getFieldValue(formData, "firstName"),
        lastName: getFieldValue(formData, "lastName"),
        email: getFieldValue(formData, "email"),
        address_id: getFieldValue(formData, "addressId"),
    }
}

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("es-SV", {
        style: "currency",
        currency: "USD",
    }).format(Number(value) || 0)

const getItemKey = (item) => item.variantId || item.productId?._id || item.productId

const getItemCount = (products = []) =>
    products.reduce((total, item) => total + (Number(item.quantity) || 0), 0)

const useOrder = (cart, customer) => {
    const [order, setOrder] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [error, setError] = useState(null)

    const cartProducts = useMemo(() => cart?.products || [], [cart?.products])
    const itemCount = useMemo(() => getItemCount(cartProducts), [cartProducts])
    const subtotal = Number(cart?.total) || 0
    const shipping = cartProducts.length ? 0 : 0
    const total = subtotal + shipping

    const createOrderFromCheckout = useCallback(async (formData, options = {}) => {
        if (!cart?._id) {
            throw new Error("No hay un carrito activo para crear la orden")
        }

        if (!cartProducts.length) {
            throw new Error("Tu carrito esta vacio")
        }

        if (!customer?._id) {
            throw new Error("Debes iniciar sesion para realizar la compra")
        }

        try {
            setIsCreating(true)
            setError(null)
            const savedOrder = await orderService.createOrder({
                shopping_cart_id: cart._id,
                customerId: customer._id,
                delivery_address: getCheckoutAddressFromForm(formData),
                save_address: Boolean(options.saveAddress),
                payment_method: "Tarjeta de credito o debito",
                payment_status: "pending",
                status: "pending",
            })
            setOrder(savedOrder)
            return savedOrder
        } catch (error) {
            setError(error)
            throw error
        } finally {
            setIsCreating(false)
        }
    }, [cart?._id, cartProducts.length, customer?._id])

    return {
        order,
        error,
        isCreating,
        createOrderFromCheckout,
        formatCurrency,
        getItemKey,
        itemCount,
        subtotal,
        shipping,
        total,
    }
}

export default useOrder
