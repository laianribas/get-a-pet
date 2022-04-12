import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Container from './components/layout/Container'
import Footer from './components/layout/Footer'
import Message from './components/layout/Message'
import Navbar from './components/layout/Navbar'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Home from './components/pages/Home'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  )
}

export default App
