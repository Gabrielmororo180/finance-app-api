import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'

export class CreateUserCase {
    async execute(createUserParams) {
        const userId = uuidv4()

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
        createUserParams.password = hashedPassword

        const newUser = {
            ...createUserParams,
            id: userId,
            firstName: createUserParams.firstName,
            lastName: createUserParams.lastName,
            email: createUserParams.email,
            password: createUserParams.password,
        }

        const createUserRepository = new PostgresCreateUserRepository()
        await createUserRepository.execute(newUser)

        return newUser
    }
}
