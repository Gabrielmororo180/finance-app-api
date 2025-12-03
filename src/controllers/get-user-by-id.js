import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, notFound, ok, serverError } from './helpers.js'
import validator from 'validator'

export class getUserByIdController {
    async execute(userId) {
        if (!userId || userId.trim() === '') {
            return badRequest({ error: 'User ID is required' })
        }

        const userUseCase = new GetUserByIdUseCase()

        try {
            if (!validator.isUUID(userId)) {
                return badRequest({ error: 'Invalid user ID format' })
            }

            const user = await userUseCase.execute(userId)

            if (!user) {
                return notFound({ error: 'User not found' })
            }

            return ok({ user })
        } catch (error) {
            console.error('Error retrieving user by ID:', error)
            return serverError()
        }
    }
}
