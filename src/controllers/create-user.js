import { CreateUSerUseCase } from '../use-cases/create-user.js'
import validator from 'validator'
import { badRequest, created, serverError } from './helpers.js'
import { EmailInUseError } from '../errors/user.js'
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
            return badRequest({
                message: 'Password must be at least 6 characters long',
            })
        }

        if (!validator.isEmail(createUserParams.email)) {
            return badRequest({ message: 'Invalid email format' })
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
