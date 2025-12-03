import { getUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, ok, serverError } from './helpers.js'

export class getUserByIdController {
    async execute(userId) {
        if (!userId || userId.trim() === '') {
            return badRequest({ error: 'User ID is required' })
        }

        const userUseCase = new getUserByIdUseCase()

        try {
            const user = await userUseCase.execute(userId)

            if (!user) {
                return badRequest({ error: 'User not found' })
            }

            return ok({ user })
        } catch (error) {
            console.error('Error retrieving user by ID:', error)
            return serverError()
        }
    }
}
