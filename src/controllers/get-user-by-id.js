import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, notFound, ok, serverError } from './helpers/http.js'
import validator from 'validator'
import { generateInvalididResponse } from './helpers/user.js'
export class getUserByIdController {
    async execute(userId) {
        if (!userId || userId.trim() === '') {
            return badRequest({ error: 'User ID is required' })
        }

        const userUseCase = new GetUserByIdUseCase()

        try {
            if (!validator.isUUID(userId)) {
                return generateInvalididResponse()
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
