import { API_URL } from "./apiConfig";

const parseResponse = async (response, fallback) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.info || data.message || fallback);
  return data;
};

const reviewService = {
  getByProduct: async (productId) => parseResponse(
    await fetch(`${API_URL}/productReviews?productId=${productId}`),
    "No se pudieron cargar los testimonios.",
  ),
  create: async (review) => parseResponse(
    await fetch(`${API_URL}/productReviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    }),
    "No se pudo enviar el testimonio.",
  ),
};

export default reviewService;
