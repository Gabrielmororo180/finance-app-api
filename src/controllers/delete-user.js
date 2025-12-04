import { DeleteUserUseCase } from '../use-cases/delete-user.js'
import { badRequest, ok, serverError } from './helpers/http.js'
import validator from 'validator'
import { generateInvalididResponse } from './helpers/user.js'

export class deleteUserController {
    async execute(userId) {
        if (!userId || userId.trim() === '') {
            return badRequest({ message: 'User ID is required' })
        }

        if (!validator.isUUID(userId)) {
            return generateInvalididResponse()
        }

        try {
            const deleteUserUseCase = new DeleteUserUseCase()
            await deleteUserUseCase.execute(userId)
            return ok({ message: 'User deleted successfully' })
        } catch (error) {
            return serverError()
        }
    }
}
