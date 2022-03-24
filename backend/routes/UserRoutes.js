import { Router } from 'express'
import UserController from '../controllers/UserController.js'

const UserRoutes = Router()

UserRoutes.post('/register', UserController.register)

export default UserRoutes