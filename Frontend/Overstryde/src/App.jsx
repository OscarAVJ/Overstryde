
import './App.css'
import { BrowserRouter as Router, Routes, Route }
  from 'react-router'
import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import { MainLayout } from './layouts/MainLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { ProductsPage } from './pages/ProductsPage'
import { SingleProductView } from './pages/SingleProductView'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path={"/products"} element={<ProductsPage />} />
            <Route path={"/singleProduct"} element={<SingleProductView />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path='/register' element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
