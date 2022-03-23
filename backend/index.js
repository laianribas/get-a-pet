import express from 'express'
import cors from 'cors'

const port = 5000

const app = express()
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.static('public'))

app.listen(port, () => {
    console.log('listening on port ' + port + ' http://localhost:5000')
})