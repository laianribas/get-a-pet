import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Container from './components/layout/Container'
import Footer from './components/layout/Footer'
import Message from './components/layout/Message'
import Navbar from './components/layout/Navbar'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'
import AddPet from './components/pages/Pets/AddPet'
import EditPet from './components/pages/Pets/EditPet'
import MyPets from './components/pages/Pets/MyPets'
import PetDetails from './components/pages/Pets/PetDetails'
import Profile from './components/pages/User/Profile'
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
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPet />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="/pet/Edit/:id" element={<EditPet />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  )
}

export default App
