import { Outlet } from "react-router-dom";

export function AuthLayout({children}){
    return(
        <div className="min-h-screen w-full p-1">
            <main className="flex-1 overflow-auto">
                <Outlet/>
            </main>
        </div>
    )
}