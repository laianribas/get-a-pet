import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const Home = () => {
  const [pets, setPets] = useState([])

  useEffect(() => {
    api.get('/pets').then((response) => {
      setPets(response.data.pets)
    })
  }, [pets])
  return (
    <section>
      <h1>Home</h1>
    </section>
  )
}

export default Home
