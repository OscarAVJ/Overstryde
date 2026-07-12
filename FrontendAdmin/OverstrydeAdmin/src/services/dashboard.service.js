const API_URL = "http://localhost:4000/api/dashboard";

export const getDashboardSummary = async () => {
  const response = await fetch(`${API_URL}/summary`, {
    credentials: "include",
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "No se pudo cargar el dashboard.");
  }

  return data;
};
