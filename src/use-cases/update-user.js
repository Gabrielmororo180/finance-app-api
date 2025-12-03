import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailInUseError } from '../errors/user.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const getUserByEmailRepository =
                new PostgresGetUserByEmailRepository()
            const existingUser = await getUserByEmailRepository.execute(
                updateUserParams.email,
            )

            if (existingUser && existingUser.id !== userId) {
                throw new EmailInUseError(
                    `Email is ${updateUserParams.email} already in use`,
                )
            }
        }

        const repository = new PostgresUpdateUserRepository()
        return await repository.execute(userId, updateUserParams)
    }
}
