import 'dotenv/config.js'
import express from 'express'
import { pool } from './src/db/postgres/helper.js'

const app = express()

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('select * from users')
        res.send(JSON.stringify(result.rows))
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
