import { Router } from 'express'
import PetController from '../controllers/PetController.js'
import verifyToken from '../helpers/verify-token.js'
const PetRoutes = Router()

PetRoutes.post('/register', verifyToken, PetController.register)

export default PetRoutes