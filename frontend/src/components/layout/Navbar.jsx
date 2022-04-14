import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'
import { Context } from '../../context/UserContext'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { authenticated, logout } = useContext(Context)
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get A Pet logo" />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/pet/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            {' '}
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Registrar-se</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
