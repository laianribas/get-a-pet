import express from 'express'
import cors from 'cors'
import UserRoutes from './routes/userRoutes.js'
import PetRoutes from './routes/PetRoutes.js'

const port = 5000

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(port, () => {
    console.log('listening on port ' + port + ' http://localhost:5000')
})