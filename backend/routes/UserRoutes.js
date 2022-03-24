import { Router } from 'express'
import UserController from '../controllers/UserController.js'

const UserRoutes = Router()

UserRoutes.post('/register', UserController.register)
UserRoutes.post('/login', UserController.login)
UserRoutes.get('/checkuser', UserController.checkUser)

export default UserRoutes