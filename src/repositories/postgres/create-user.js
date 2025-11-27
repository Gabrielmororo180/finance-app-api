import { PostgresHelper } from '../../helpers/postgres-helper.js'

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        PostgresHelper.query(
            'INSERT INTO users (ID, first_name,last_name,email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                createUserParams.id,
                createUserParams.firstName,
                createUserParams.lastName,
                createUserParams.email,
                createUserParams.password,
            ],
        )
    }
}
