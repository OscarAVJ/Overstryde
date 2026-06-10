const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function loginCustomer({ email, password }) {
  const res = await fetch(`${API_URL}/loginCustomer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", 
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }

  return data;
}

export async function registerCustomer({ name, last_name, email, password }) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("last_name", last_name);
  formData.append("email", email);
  formData.append("password", password);

  const res = await fetch(`${API_URL}/registerCustomers`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al registrar");
  }

  return data;
}

export async function verifyEmailCode(verificationCodeRequest) {
  const res = await fetch(`${API_URL}/registerCustomers/verifyCodeEmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ verificationCodeRequest }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Código inválido");
  }

  return data;
}

export async function requestPasswordRecovery(email) {
  const res = await fetch(`${API_URL}/recoverPassword/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al enviar el correo");
  }

  return data;
}

export async function resetPassword({ code, newPassword }) {
  const res = await fetch(`${API_URL}/recoverPassword/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ code, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al restablecer la contraseña");
  }

  return data;
}

export async function logoutCustomer() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al cerrar sesión");
  }

  return data;
}