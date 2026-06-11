import authAdmin from "@/services/login.service";
import { createContext, useContext, useState } from "react"
const AuthContext = createContext()
export const AuthProvider = ({children})=>{

    const [authUser, setAuthUser] = useState(null); 
    const login = async (data) => {
        const response = await authAdmin.loginAdmin(data);
        if(response.ok !== true) return false
        console.log(response.ok)
        setAuthUser(response.data.data)
        return response.ok
    }
    const logout = async () => {
        await  authAdmin.logoutAdmin();
        setAuthUser(null)
    }
    const value = {
        authUser, login, logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
