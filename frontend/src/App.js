import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element="{<Home />}" />
                                <Route path="/users" element="{<Users />}" />
                                <Route path="/allusers" element={<Navigate to="/users" />} />
                                <Route path="/contact" element="{<Contact />}" /> */}
        <Route path="/" element={<Home />} />{' '}
        <Route path="/login" element={<Login />} />{' '}
        <Route path="/register" element={<Register />} />{' '}
      </Routes>{' '}
      <Footer />
    </Router>
  )
}

export default App
