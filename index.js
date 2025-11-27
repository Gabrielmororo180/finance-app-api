import 'dotenv/config.js'
import express from 'express'
import { pool } from './src/db/postgres/helper.js'
import { createUserController } from './src/controllers/create-user.js'

const app = express()

// Middleware para parsear JSON
app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('select * from users')
        res.send(JSON.stringify(result.rows))
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post('/api/users', async (req, res) => {
    try {
        const controller = new createUserController()
        const httpRequest = {
            body: req.body,
        }

        const httpResponse = await controller.execute(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (error) {
        console.error('Error handling request:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
