import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from './user.js'

const app = express()
dotenv.config()

const connectDB = () => {
    const {
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_HOSTNAME,
        MONGO_PORT,
        MONGO_DB,
    } = process.env

    const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

    mongoose.connect(url).then(function () {
        console.log('MongoDB is connected')
    })
    .catch(function(err) {
        console.log(err)
    })

}

const port = 2103
app.use(cors({ origin: '*' })) // cors
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

app.listen(port, function () {
    connectDB()
    console.log(`Api corriendo en http://localhost:${port}`)
})

app.get('/', (req, res) => {
    console.log('mi primer endpoint')
    res.status(200).send('Hola! la API esta funcionando correctamente')
});

app.post('/', async (req, res) => {
    try {
        var data = req.body
        var newUser = new User(data)
        await newUser.save()
        res.status(200).send({
            success: true,
            message: "Usuario Registrado",
            outcome: []
        })
    }
    catch (err) {
        res.status(400).send({
            success: false,
            message: "Error creando usuario",
            outcome: []

        })

    }
})