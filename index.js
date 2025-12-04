import 'dotenv/config.js'
import express from 'express'
import { pool } from './src/db/postgres/helper.js'
import { createUserController } from './src/controllers/create-user.js'
import { getUserByIdController } from './src/controllers/get-user-by-id.js'
import { updateUserController } from './src/controllers/update-user.js'
import { deleteUserController } from './src/controllers/delete-user.js'
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js'
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'
import { CreateUSerUseCase } from './src/use-cases/create-user.js'
import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js'
import { UpdateUserUseCase } from './src/use-cases/update-user.js'
import { PostgresUpdateUserRepository } from './src/repositories/postgres/update-user.js'
import { DeleteUserUseCase } from './src/use-cases/delete-user.js'
import { PostgresDeleteUserRepository } from './src/repositories/postgres/delete-user.js'
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
        const getUserByIdRepository = new PostgresGetUserByIdRepository()

        const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

        const controller = new getUserByIdController(getUserByIdUseCase)

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
        const deleteUserRepository = new PostgresDeleteUserRepository()
        const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)
        const controller = new deleteUserController(deleteUserUseCase)
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
        const updateUserRepository = new PostgresUpdateUserRepository()
        const updateUserUseCase = new UpdateUserUseCase(updateUserRepository)
        const controller = new updateUserController(updateUserUseCase)

        const httpResponse = await controller.execute(req)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    } catch (error) {
        console.error('Error handling request:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.post('/api/users', async (req, res) => {
    try {
        const createUserRepository = new PostgresCreateUserRepository()
        const createUserUseCase = new CreateUSerUseCase(createUserRepository)
        const controller = new createUserController(createUserUseCase)
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
