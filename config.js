const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE
}