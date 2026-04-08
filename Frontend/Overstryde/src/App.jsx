
import './App.css'
import { BrowserRouter as Router, Routes, Route }
  from 'react-router'
import { HomePage } from './pages/HomePage'
import { Navbar } from './components/Navbar'


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
