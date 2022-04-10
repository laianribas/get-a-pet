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
PetRoutes.get('/:id', PetController.getPetById)
PetRoutes.delete('/:id', verifyToken, PetController.removePetById)
PetRoutes.patch(
    '/:id',
    verifyToken,
    imageUpload.array('images'),
    PetController.updatePet
)
PetRoutes.patch('/schedule/:id', verifyToken, PetController.schedule)
PetRoutes.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)

export default PetRoutes