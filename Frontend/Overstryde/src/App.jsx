
import './App.css'
import { BrowserRouter as Router, Routes, Route }
  from 'react-router'
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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path={"/products"} element={<ProductsPage />} />
            <Route path={"/singleProduct"} element={<SingleProductView />} />
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
