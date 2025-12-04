import { CreateUSerUseCase } from '../use-cases/create-user.js'
import validator from 'validator'
import { badRequest, created, serverError } from './helpers/http.js'
import { EmailInUseError } from '../errors/user.js'
import {
    generateInvalidPasswordResponse,
    gerenateInvalidEmailResponse,
} from './helpers/user.js'
export class createUserController {
    execute(httpRequest) {
        const createUserParams = httpRequest.body

        const requiredFields = ['firstName', 'lastName', 'email', 'password']
        for (const field of requiredFields) {
            if (
                !createUserParams[field] ||
                createUserParams[field].trim() === ''
            ) {
                return badRequest({
                    message: `Missing or empty field: ${field}`,
                })
            }
        }

        if (createUserParams.password.length < 6) {
            return generateInvalidPasswordResponse
        }

        if (!validator.isEmail(createUserParams.email)) {
            return gerenateInvalidEmailResponse
        }

        const createUserCase = new CreateUSerUseCase()

        return createUserCase
            .execute(createUserParams)
            .then((newUser) => {
                return created({ user: newUser })
            })
            .catch((error) => {
                console.error('Error creating user:', error)
                if (error instanceof EmailInUseError) {
                    return badRequest({ message: error.message })
                }
                return serverError()
            })
    }
}
