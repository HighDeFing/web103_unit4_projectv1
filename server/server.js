import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/cars.js'
import { fileURLToPath } from 'url'

// import the router from your routes file


dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())

// Serve static files from the 'data/img' directory
app.use('/data/img', express.static(path.join(__dirname, 'data/img')));

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})