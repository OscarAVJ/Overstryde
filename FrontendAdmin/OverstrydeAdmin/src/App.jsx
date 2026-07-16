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
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./ProtectedRoute";
import Users from "./pages/Users";
import Testimonials from "./pages/Testimonials";
import NewPassword from "./pages/NewPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/*Layout para login y recuperar contraseña */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="newPass" element={<NewPassword />} />
          </Route>

          {/*Layout principal*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="banners" element={<Banners />} />
              <Route path="users" element={<Users />} />
              <Route path="testimonials" element={<Testimonials />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
