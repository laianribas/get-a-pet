import getToken from '../helpers/get-token.js'
import getUserByToken from '../helpers/get-user-by-token.js'
import Pet from '../models/Pet.js'

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
}