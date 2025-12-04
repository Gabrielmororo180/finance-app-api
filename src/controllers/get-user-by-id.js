import { badRequest, notFound, ok, serverError } from './helpers/http.js'
import validator from 'validator'
import { generateInvalididResponse } from './helpers/user.js'

export class getUserByIdController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase
    }
    async execute(userId) {
        try {
            if (!userId || userId.trim() === '') {
                return badRequest({ error: 'User ID is required' })
            }

            if (!validator.isUUID(userId)) {
                return generateInvalididResponse()
            }

            const user = await this.userUseCase.execute(userId)

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
