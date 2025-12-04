import { PostgresDeleteUserRepository } from '../repositories/postgres/delete-user.js'
import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js'

export class DeleteUserUseCase {
    async execute(userId) {
        const deleteUserRepository = new PostgresDeleteUserRepository()
        const getUserByIdRepository = new PostgresGetUserByIdRepository()

        const existingUser = await getUserByIdRepository.execute(userId)

        if (!existingUser) {
            throw new Error(`User with ID ${userId} does not exist`)
        }
        return await deleteUserRepository.execute(userId)
    }
}
