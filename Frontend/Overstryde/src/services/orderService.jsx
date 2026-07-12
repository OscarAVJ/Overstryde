const URL = "http://localhost:4000/api/orders"

const orderService = {}

const getErrorMessage = async (response, fallbackMessage) => {
    try {
        const json = await response.json()
        return json.message || fallbackMessage
    } catch {
        return fallbackMessage
    }
}

orderService.getOrders = async () => {
    const response = await fetch(`${URL}/`)
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Could not load orders"))
    }
    return response.json()
}

orderService.getOrderById = async (id) => {
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Could not load order"))
    }
    return response.json()
}

orderService.createOrder = async (order) => {
    const response = await fetch(`${URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    })
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Could not create order"))
    }
    const json = await response.json()
    return json.order
}

orderService.updateOrder = async (id, order) => {
    const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    })
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Could not update order"))
    }
    const json = await response.json()
    return json.order
}

orderService.deleteOrder = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
    })
    if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Could not delete order"))
    }
    return response.json()
}

export default orderService
