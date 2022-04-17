import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../utils/api'
import styles from './AddPet.module.css'
import PetForm from '../../form/PetForm'
import useFlashMessage from '../../../hooks/useFlashMessage'

const EditPet = () => {
  const [pet, setPet] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      .then((response) => {
        setPet(response.data.pet)
      })
  }, [token, id])
  async function updatePet(pet) {}
  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o pet: {pet.name}</h1>
        <p>Depois da Edição os dados serão atualizados!</p>
      </div>
      {pet.name && (
        <PetForm handleSubmit={updatePet} btnText="Atualizar" petData={pet} />
      )}
    </section>
  )
}

export default EditPet
