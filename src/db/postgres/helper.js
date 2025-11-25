import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
})

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
