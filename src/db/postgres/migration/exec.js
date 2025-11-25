import { pool } from '../helper.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execMigration = async () => {
    const client = await pool.connect()
    try {
        const filepath = path.join(__dirname, '01-init.sql')
        const script = fs.readFileSync(filepath, 'utf-8')

        await client.query(script)

        console.log(' Migration executed successfully')
    } catch (err) {
        console.error(' Error executing migration', err.stack)
    } finally {
        await client.release()
        process.exit(0)
    }
}

execMigration()
