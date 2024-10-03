import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import "dotenv/config"

import profileRouter from './src/routes/profile'
import noteRouter from './src/routes/note'

const app = express()

const corsOption = {
    origin: '*',
    credentials: true
}

app.use(cors(corsOption))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/profile", profileRouter)

app.use("/note", noteRouter)

const port = process.env.PORT!

const databaseUri = process.env.DATABASE_URI!

const startApp = async () => {
    try {
        const connected = await mongoose.connect(databaseUri)
        if(connected) {
            console.log(`connected to the database`)
            app.listen(port, () => {
                console.log(`app listening on port ${port}`)
            })
        }
    } catch(error) {
        console.log(error)
        throw error
    }
}

startApp()