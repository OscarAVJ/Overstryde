
import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import { MainLayout } from './layouts/MainLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { ProductsPage } from './pages/ProductsPage'
import { SingleProductView } from './pages/SingleProductViewPage'
import { CheckoutPaymentPage } from './pages/CheckoutPaymentPage'
import { LogInPage } from './pages/LogInPage'
import { RecoverAccountPage } from './pages/RecoverAccountPage'
import { ProfilePage } from './pages/ProfilePage'
import { TermsOfServicePage } from './pages/TermsOfServicePage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'

function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, search])

  return null
}

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path={"/products"} element={<ProductsPage />} />
            <Route path={"/singleProduct/:id"} element={<SingleProductView />} />
            <Route path={"/checkoutPayment"} element={<CheckoutPaymentPage />} />
            <Route path={"/profile"} element={<ProfilePage />} />
            <Route path={"/termsOfService"} element={<TermsOfServicePage />} />
            <Route path={"/aboutUs"} element={<AboutPage />} />
            <Route path={"/contact"} element={<ContactPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LogInPage />} />
            <Route path='/recoverAccount' element={<RecoverAccountPage />} />
          </Route>
        </Routes>

      </Router>
    </>
  )
}

export default App
