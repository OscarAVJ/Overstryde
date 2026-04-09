
import './App.css'
import { BrowserRouter as Router, Routes, Route }
  from 'react-router'
import { HomePage } from './pages/HomePage'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
