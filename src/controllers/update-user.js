import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { badRequest, ok, serverError } from './helpers/http.js'
import { EmailInUseError } from '../errors/user.js'
import validator from 'validator'
import {
    generateInvalidPasswordResponse,
    gerenateInvalidEmailResponse,
    generateInvalididResponse,
} from './helpers/user.js'

export class updateUserController {
    execute(httpRequest) {
        const userId = httpRequest.params.userId
        const updateUserParams = httpRequest.body

        if (!validator.isUUID(userId)) {
            return generateInvalididResponse()
        }

        if (!userId || userId.trim() === '') {
            return badRequest({ message: 'User ID is required' })
        }
        if (updateUserParams.password) {
            if (updateUserParams.password.length < 6) {
                return generateInvalidPasswordResponse()
            }
        }

        if (updateUserParams.email) {
            if (!validator.isEmail(updateUserParams.email)) {
                return gerenateInvalidEmailResponse()
            }
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
