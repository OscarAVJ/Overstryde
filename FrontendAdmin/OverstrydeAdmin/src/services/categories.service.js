const API_URL = "http://localhost:4000/api/categories";

const request = async (url = API_URL, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al procesar la categoría.");
  }

  return data;
};

export const getCategories = () => request();

export const createCategory = (category) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });

export const updateCategory = (id, category) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });

export const deleteCategory = (id) =>
  request(`${API_URL}/${id}`, { method: "DELETE" });
