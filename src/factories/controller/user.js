import { createUserController } from '../../controllers/create-user.js'
import { getUserByIdController } from '../../controllers/get-user-by-id.js'
import { updateUserController } from '../../controllers/update-user.js'
import { deleteUserController } from '../../controllers/delete-user.js'
import { PostgresCreateUserRepository } from '../../repositories/postgres/create-user.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/get-user-by-id.js'
import { PostgresUpdateUserRepository } from '../../repositories/postgres/update-user.js'
import { PostgresDeleteUserRepository } from '../../repositories/postgres/delete-user.js'
import { CreateUSerUseCase } from '../../use-cases/create-user.js'
import { GetUserByIdUseCase } from '../../use-cases/get-user-by-id.js'
import { UpdateUserUseCase } from '../../use-cases/update-user.js'
import { DeleteUserUseCase } from '../../use-cases/delete-user.js'

export const makeCreateUserController = () => {
    const createUserRepository = new PostgresCreateUserRepository()
    const createUserUseCase = new CreateUSerUseCase(createUserRepository)
    const controller = new createUserController(createUserUseCase)
    return controller
}

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)
    const controller = new getUserByIdController(getUserByIdUseCase)
    return controller
}

export const makeUpdateUserController = () => {
    const updateUserRepository = new PostgresUpdateUserRepository()
    const updateUserUseCase = new UpdateUserUseCase(updateUserRepository)
    const controller = new updateUserController(updateUserUseCase)
    return controller
}

export const makeDeleteUserController = () => {
    const deleteUserRepository = new PostgresDeleteUserRepository()
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)
    const controller = new deleteUserController(deleteUserUseCase)
    return controller
}
