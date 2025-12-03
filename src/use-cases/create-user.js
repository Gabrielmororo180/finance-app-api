import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailInUseError } from '../errors/user.js'
export class CreateUSerUseCase {
    async execute(createUserParams) {
        const userId = uuidv4()
        const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
        const existingUser = await getUserByEmailRepository.execute(
            createUserParams.email,
        )

        if (existingUser) {
            throw new EmailInUseError(
                `Email is ${createUserParams.email} already in use`,
            )
        }
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
