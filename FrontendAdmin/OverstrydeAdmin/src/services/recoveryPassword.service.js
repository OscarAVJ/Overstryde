const API_URL = "http://localhost:4000/api/recoverPasswordAdmins";

const request = async (path, body) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "No fue posible completar la solicitud.");
  }

  return data;
};

export const requestAdminPasswordRecovery = (email) =>
  request("/request", { email });

export const resetAdminPassword = ({ code, newPassword }) =>
  request("/reset", { code, newPassword });
