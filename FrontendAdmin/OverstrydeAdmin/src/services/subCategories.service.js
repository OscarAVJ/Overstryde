const API_URL = "http://localhost:4000/api/subcategories";

const request = async (url = API_URL, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al procesar las subcategorías.");
    }

    return data;
  } catch (error) {
    throw new Error("Error con el servidor: " + error.message);
  }
};

export const getSubCategories = () => request();

export const createSubCategory = (subcategory) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subcategory),
  });

export const updateSubCategory = (id, subcategory) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subcategory),
  });

export const deleteSubCategory = (id) =>
  request(`${API_URL}/${id}`, { method: "DELETE" });
