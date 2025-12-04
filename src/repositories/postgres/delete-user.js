import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresDeleteUserRepository {
    async execute(userId) {
        await PostgresHelper.query('DELETE FROM users WHERE id = $1', [userId])
    }
}
