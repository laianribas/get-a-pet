import User from '../models/User.js'
import bcrypt from 'bcrypt'
import createUserToken from '../helpers/create-user-token.js'
import getToken from '../helpers/get-token.js'
import jwt from 'jsonwebtoken'

export default class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmPassword } = req.body
            //validations
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório!' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório!' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }
        if (!confirmPassword) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
            return
        }
        if (password != confirmPassword) {
            res
                .status(422)
                .json({ message: 'A senha e a confirmação não são iguais' })
            return
        }
        //check if user already exists
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            res.status(422).json({ message: 'E-mail já está cadastrado!' })
            return
        }

        //create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()

            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            res
                .status(400)
                .json({ message: 'Por favor, insira um endereço de e-mail!' })
        }
        if (!password) {
            res.status(400).json({ message: 'Por favor, insira a senha!' })
        }

        const user = (await User.findOne({ email: email })) ?
            await User.findOne({ email: email }) :
            ''
        const passwordCheck = user ?
            await bcrypt.compare(password, user.password) :
            ''
        if (!user || !passwordCheck) {
            res.status(401).json({ message: 'E-mail e/ou senha inválido!' })
            return
        }
        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser
        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nosso_secret')
            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id
        const user = await User.findById(id).select('-password')

        if (!user) {
            res.status(400).json({ message: 'Usuário não encontrado!' })
            return
        }
        res.status(200).json({ user })
    }
}