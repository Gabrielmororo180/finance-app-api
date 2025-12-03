import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        const setClauses = []
        const values = []
        let index = 1

        for (const [key, value] of Object.entries(updateUserParams)) {
            setClauses.push(`${key} = $${index}`)
            values.push(value)
            index++
        }

        values.push(userId)

        const query = `
            UPDATE users
            SET ${setClauses.join(', ')}
            WHERE id = $${index}
        `

        await PostgresHelper.query(query, values)
    }
}
