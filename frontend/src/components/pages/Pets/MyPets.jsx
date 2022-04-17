import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RoundedImage from '../../../components/layout/RoundedImage'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'
import styles from './Dashboard.module.css'

const MyPets = () => {
  const [pets, setPets] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api
      .get('/pets/mypets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      .then((response) => {
        setPets(response.data.pets)
      })
  }, [token])

  async function removePets(id) {
    let msgType = 'success'

    const data = await api
      .delete(`/pets/${id}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id)
        setPets(updatedPets)
        return response.data
      })
      .catch((error) => {
        msgType = 'error'
        return error.response.data
      })
    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>MyPets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.petlist_row} key={pet._id}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.actions}></div>
              {pet.avaliable ? (
                <>
                  {pet.adopter && (
                    <button className={styles.conclude_btn}>
                      Concluir Adoção
                    </button>
                  )}
                  <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                  <button
                    onClick={() => {
                      removePets(pet._id)
                    }}
                  >
                    Excluir
                  </button>
                </>
              ) : (
                <p>Pet já adotado!</p>
              )}
            </div>
          ))}
        {pets.length === 0 && <p>Não há pets cadastrados</p>}
      </div>
    </section>
  )
}

export default MyPets
