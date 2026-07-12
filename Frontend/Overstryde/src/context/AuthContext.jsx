import { createContext, useState, useEffect, useCallback } from "react";
import { logoutCustomer } from "../services/Authservice";
import customerService from "../services/customerService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const data = await customerService.getCurrentCustomer();
    setUser(data);
    return data;
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await refreshUser();
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    try {
      await logoutCustomer();
    } catch {
      setUser(null);
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
