import { CreateUSerUseCase } from '../use-cases/create-user.js'

export class createUserController {
    execute(httpRequest) {
        const createUserParams = httpRequest.body

        const requiredFields = ['firstName', 'lastName', 'email', 'password']
        for (const field of requiredFields) {
            if (
                !createUserParams[field] ||
                createUserParams[field].trim() === ''
            ) {
                return {
                    statusCode: 400,
                    body: { error: `Missing field: ${field}` },
                }
            }
        }

        const createUserCase = new CreateUSerUseCase()

        return createUserCase
            .execute(createUserParams)
            .then((newUser) => {
                return {
                    statusCode: 201,
                    body: { user: newUser },
                }
            })
            .catch((error) => {
                console.error('Error creating user:', error)
                return {
                    statusCode: 500,
                    body: { error: 'Internal server error' },
                }
            })
    }
}
