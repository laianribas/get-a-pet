import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AddPet.module.css'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import PetForm from '../../form/PetForm'

const AddPet = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate
  async function registerPet(pet) {
    let msgType = 'success'
    const formData = new FormData()
    await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    const data = await api
      .post('pets/register', formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        msgType = 'error'
        return error.response.data
      })

    setFlashMessage(data.message, msgType)
    if (msgType !== 'error') {
      navigate('/pets/mypets')
    }
  }
  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>(Os pets Cadastrados ficarão disponíveis para adoção!)</p>
      </div>
      <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
    </section>
  )
}

export default AddPet
