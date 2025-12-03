import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const rows = await PostgresHelper.query(
            'SELECT id, firstname, lastname, email FROM users WHERE id = $1',
            [userId],
        )

        if (rows.length === 0) {
            return null
        }

        return rows[0]
    }
}
