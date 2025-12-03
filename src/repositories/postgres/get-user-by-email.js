import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresGetUserByEmailRepository {
    async execute(userEmail) {
        const rows = await PostgresHelper.query(
            'SELECT id, firstname, lastname, email FROM users WHERE email = $1',
            [userEmail],
        )

        if (rows.length === 0) {
            return null
        }
        return rows[0]
    }
}
