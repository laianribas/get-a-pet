import getToken from '../helpers/get-token.js'
import getUserByToken from '../helpers/get-user-by-token.js'
import Pet from '../models/Pet.js'
import Schema from 'mongoose'

export default class PetController {
    static async register(req, res) {
        const { name, age, weight, color } = req.body
        const images = req.files
        const avaliable = true

        //upload images

        //validations
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório!' })
        }
        if (!age) {
            return res.status(422).json({ message: 'A idade é obrigatória!' })
        }
        if (!weight) {
            return res.status(422).json({ message: 'O peso é obrigatório!' })
        }
        if (!color) {
            return res.status(422).json({ message: 'A cor é obrigatória' })
        }

        if (images.length === 0) {
            return res.status(422).json({ message: 'A imagem é obrigatória' })
        }

        //get pet owner

        const token = getToken(req)
        const user = await getUserByToken(token)

        //create a pet

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            avaliable,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
            return res.status(201).json({ message: 'Pet saved successfully', newPet })
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }
    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createdAt')

        return res.status(200).json({ Pets: pets })
    }
    static async getAllUserPets(req, res) {
        //get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

        return res.status(200).json({ pets })
    }
    static async myAdoptions(req, res) {
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

        return res.status(200).json({ pets })
    }
    static async getPetById(req, res) {
        const { id } = req.params
        if (!Schema.Types.ObjectId.isValid(id)) {
            return res.status(422).json({ message: 'ID inválido!' })
        }
        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            return res.status(404).json({ message: 'Não encontrado!' })
        }
        return res.status(200).json({ pet })
    }
    static async removePetById(req, res) {
        const { id } = req.params
        if (!Schema.Types.ObjectId.isValid(id)) {
            return res.status(422).json({ message: 'ID inválido!' })
        }
        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            return res.status(404).json({ message: 'Não encontrado!' })
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({
                message: 'Houve um problema ao processar sua solicitação, tente novamente mais tarde.'
            })
        }

        await Pet.findByIdAndDelete(id)

        return res.status(200).json({ message: 'Pet removido com sucesso!' })
    }
    static async updatePet(req, res) {
        const { id } = req.params
        const { name, age, weight, color, avaliable } = req.body
        const images = req.files

        const updatedData = {}

        //check if pet exists
        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            return res.status(404).json({ message: 'Não encontrado!' })
        }
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({
                message: 'Houve um problema ao processar sua solicitação, tente novamente mais tarde.'
            })
        }
        //validations
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório!' })
        } else {
            updatedData.name = name
        }
        if (!age) {
            return res.status(422).json({ message: 'A idade é obrigatória!' })
        } else {
            updatedData.age = age
        }
        if (!weight) {
            return res.status(422).json({ message: 'O peso é obrigatório!' })
        } else {
            updatedData.weight = weight
        }
        if (!color) {
            return res.status(422).json({ message: 'A cor é obrigatória' })
        } else {
            updatedData.color = color
        }

        if (images.length > 0) {
            updatedData.images = []
            images.map((image) => {
                updatedData.images.push(image.filename)
            })
        }

        const updatedPet = await Pet.findByIdAndUpdate(id, updatedData)

        return res.status(200).json({ message: 'Pet atualizado com sucesso!' })
    }

    static async schedule(req, res) {
        const { id } = req.params

        //check if pet already exists
        const pet = await Pet.findOne({ _id: id })

        //check if user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.equals(user._id)) {
            res.status(422).json({
                message: 'Você não pode agendar uma visita para o próprio pet!'
            })
            return
        }

        //check if user has already scheduled a visit

        if (pet.adopter) {
            if (pet.adopter._id.equals(user._id)) {
                res.status(422).json({
                    message: 'Você já agendou uma visita para este pet!'
                })
                return
            }
        }

        //add user to pets

        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(pet._id, pet)

        res.status(200).json({
            message: `A visita foi agendada com sucesso. Entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`
        })
    }

    static async concludeAdoption(req, res) {
        const { id } = req.params

        //check if pet already exists
        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            return res.status(404).json({ message: 'Não encontrado!' })
        }
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({
                message: 'Houve um problema ao processar sua solicitação, tente novamente mais tarde.'
            })
        }

        pet.avaliable = false

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({
            message: 'Parabéns, o processo de adoção foi concluído!'
        })
    }
}