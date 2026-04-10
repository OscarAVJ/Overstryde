import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "./components/ui/sidebar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard/>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
