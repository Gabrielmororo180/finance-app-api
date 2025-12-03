import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { badRequest, ok, serverError } from './helpers.js'
import { EmailInUseError } from '../errors/user.js'
import validator from 'validator'

export class updateUserController {
    execute(httpRequest) {
        const userId = httpRequest.params.userId
        const updateUserParams = httpRequest.body

        if (!validator.isUUID(userId)) {
            return badRequest({ message: 'User ID is not valid' })
        }

        if (!userId || userId.trim() === '') {
            return badRequest({ message: 'User ID is required' })
        }

        if (updateUserParams.password.length < 6) {
            return badRequest({
                message: 'Password must be at least 6 characters long',
            })
        }

        if (!validator.isEmail(updateUserParams.email)) {
            return badRequest({ message: 'Invalid email format' })
        }

        const updateUserUseCase = new UpdateUserUseCase()

        return updateUserUseCase
            .execute(userId, updateUserParams)
            .then((updatedUser) => {
                return ok({ user: updatedUser })
            })
            .catch((error) => {
                console.error('Error updating user:', error)
                if (error instanceof EmailInUseError) {
                    return badRequest({ message: error.message })
                }
                return serverError()
            })
    }
}
