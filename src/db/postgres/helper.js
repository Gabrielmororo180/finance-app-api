import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
})

export class PostgresHelper {
    static async query(text, params) {
        const client = await pool.connect()
        try {
            const res = await client.query(text, params)
            return res.rows
        } catch (err) {
            console.error('Error executing query', err.stack)
            throw err
        } finally {
            client.release()
        }
    }
}

const query = async (text, params) => {
    const client = await pool.connect()
    try {
        const res = await client.query(text, params)
        return res.rows
    } catch (err) {
        console.error('Error executing query', err.stack)
        throw err
    } finally {
        client.release()
    }
}

export { pool, query }
