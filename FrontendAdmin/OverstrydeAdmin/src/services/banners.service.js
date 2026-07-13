const API_URL = "http://localhost:4000/api/banners";

const request = async (url = API_URL, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al procesar el banner.");
  }

  return data;
};

const toFormData = (banner) => {
  const formData = new FormData();
  formData.append("title", banner.title);
  formData.append("description", banner.description || "");

  if (banner.shortcut_title && banner.path) {
    formData.append("shortcut_title", banner.shortcut_title);
    formData.append("path", banner.path);
  }

  if (typeof banner.active === "boolean") {
    formData.append("active", String(banner.active));
  }

  if (banner.image instanceof File) {
    formData.append("image", banner.image);
  }

  return formData;
};

export const getBanners = () => request();

export const createBanner = (banner) =>
  request(API_URL, { method: "POST", body: toFormData(banner) });

export const updateBanner = (id, banner) =>
  request(`${API_URL}/${id}`, { method: "PUT", body: toFormData(banner) });

export const deleteBanner = (id) =>
  request(`${API_URL}/${id}`, { method: "DELETE" });
