const API_URL = "http://localhost:4000/api";

const authAdmin = {};
authAdmin.loginAdmin = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/loginAdmins`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json().catch(() => ({}));
  console.log(json)
  return {
    ok: response.ok,
    data: json
  };
};

authAdmin.logoutAdmin = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    status: response.status,
    data,
    message: data.message,
  };
};

export default authAdmin;
