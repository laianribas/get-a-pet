import { Router } from 'express'
import PetController from '../controllers/PetController.js'
import verifyToken from '../helpers/verify-token.js'
import imageUpload from '../helpers/image-upload.js'

const PetRoutes = Router()

PetRoutes.post(
    '/register',
    verifyToken,
    imageUpload.array('images'),
    PetController.register
)
PetRoutes.get('/', PetController.getAll)
PetRoutes.get('/mypets', verifyToken, PetController.getAllUserPets)
PetRoutes.get('/myadoptions', verifyToken, PetController.myAdoptions)

export default PetRoutes