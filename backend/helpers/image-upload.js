import multer from 'multer'
import path from 'path'

const imageStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        let folder = ''
        if (req.baseUrl.includes('users')) {
            folder = 'users'
        } else if (req.baseUrl.includes('pets')) {
            folder = 'pets'
        }

        callback(null, `public/images/${folder}`)
    },
    filename: function(req, file, callback) {
        callback(
            null,
            Date.now() +
            String(Math.floor(Math.random() * 1000)) +
            path.extname(file.originalname)
        )
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return callback(new Error('Por favor, Envie apenas jpg ou png!'))
        }
        callback(undefined, true)
    }
})

export default imageUpload