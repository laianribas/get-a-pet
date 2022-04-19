import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import api from '../../../utils/api'
import RoundedImage from '../../layout/RoundedImage'

const MyAdoptions = () => {
  const [pets, setPets] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api
      .get('/pets/myadoptions', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      .then((response) => {
        setPets(response.data.pets)
      })
  }, [token])

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>Minhas Adoções</h1>
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
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Para falar com:</span> {pet.user.name}
                </p>
                <p>
                  <span className="bold">Ligue para:</span> {pet.user.phone}
                </p>
              </div>
              <div className={styles.actions}></div>
              {pet.avaliable ? (
                <p>Adoção em processo...</p>
              ) : (
                <p>Pet já adotado!</p>
              )}
            </div>
          ))}
        {pets.length === 0 && <p>Ainda não há adoções de Pets.</p>}
      </div>
    </section>
  )
}

export default MyAdoptions
