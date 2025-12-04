import 'dotenv/config.js'
import express from 'express'
import { pool } from './src/db/postgres/helper.js'
import {
    makeCreateUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
    makeDeleteUserController,
} from './src/factories/controller/user.js'

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

app.get('/api/users/:id', async (req, res) => {
    try {
        const controller = makeGetUserByIdController()
        const userId = req.params.id
        const { statusCode, body } = await controller.execute(userId)

        res.status(statusCode).json(body)
    } catch (error) {
        console.error('Error handling request:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.delete('/api/users/:userId', async (req, res) => {
    try {
        const controller = makeDeleteUserController()
        const userId = req.params.userId

        const httpResponse = await controller.execute(userId)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (error) {
        console.error('Error handling request:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.patch('/api/users/:userId', async (req, res) => {
    try {
        const controller = makeUpdateUserController()

        const httpResponse = await controller.execute(req)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (error) {
        console.error('Error handling request:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.post('/api/users', async (req, res) => {
    try {
        const controller = makeCreateUserController()
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
