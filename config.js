const dotenv = require('dotenv')
dotenv.config()

const initOptions = {
  error(error, e) {
      if (e.cn) {
          console.log('CN:', e.cn);
          console.log('EVENT:', error.message || error);
      }
  }
}

const pgp = require('pg-promise')(initOptions)

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@db:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const db = pgp(connectionString)
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
})

module.exports = {
  pool,
  db,
  isProduction,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE
}
