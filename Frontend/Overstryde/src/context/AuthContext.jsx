import { createContext, useState, useEffect, useCallback } from "react";
import { logoutCustomer } from "../services/Authservice";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
        const res = await fetch(`${API_URL}/customers`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (_) {
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutCustomer();
    } catch (_) {
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};