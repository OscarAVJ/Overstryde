const API_URL = "http://localhost:4000/api/productReviews";

const request = async (url = API_URL, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.info || data.message || "No se pudo procesar el testimonio.");
  return data;
};

export const getTestimonials = () => request();
export const createTestimonial = (data) => request(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
export const updateTestimonial = (id, data) => request(`${API_URL}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
export const deleteTestimonial = (id) => request(`${API_URL}/${id}`, { method: "DELETE" });
