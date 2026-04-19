import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "./components/ui/sidebar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { AuthLayout } from "./AuthLayout";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Banners from "./pages/Banners";
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/*Layout para login y recuperar contraseña */}
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="forgotPassword" element={<ForgotPassword/>}/>
        </Route>

        {/*Layout principal*/}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard/>} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products/>}/>
          <Route path="categories" element={<Categories/>}/>
          <Route path="banners" element={<Banners/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
