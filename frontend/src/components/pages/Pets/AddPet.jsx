import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AddPet.module.css'
import api from '../../../utils/api'
import { useFlashMessage } from '../../../hooks/useFlashMessage'
import PetForm from '../../form/PetForm'

const AddPet = () => {
  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>(Os pets Cadastrados ficarão disponíveis para adoção!)</p>
      </div>
      <PetForm btnText="Cadastrar Pet" />
    </section>
  )
}

export default AddPet
