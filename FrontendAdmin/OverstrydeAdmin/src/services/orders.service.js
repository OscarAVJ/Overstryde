const API_URL = "http://localhost:4000/apI/orders"

export const getOrders = async () => {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error("Error obteniendo las órdenes.")
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error con el servidor: " + error.message)
  }
}

export const updateOrder = async (id, order) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    })

    const data = response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al procesar el update");
    }

    return data;

  } catch (error) {
    throw new Error("Error con el servidor: " + error.message)
  }
}