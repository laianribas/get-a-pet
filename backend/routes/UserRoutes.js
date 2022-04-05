import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import verifyToken from '../helpers/verify-token.js'
import imageUpload from '../helpers/image-upload.js'

const UserRoutes = Router()

UserRoutes.post('/register', UserController.register)
UserRoutes.post('/login', UserController.login)
UserRoutes.get('/checkuser', UserController.checkUser)
UserRoutes.get('/:id', UserController.getUserById)
UserRoutes.patch(
    '/edit/:id',
    verifyToken,
    imageUpload.single('image'),
    UserController.editUser
)

export default UserRoutes