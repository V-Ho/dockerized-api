const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')
const { db, PORT, HOST } = require('./config')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const getAll = require('./controllers/getAll')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => { getAll.handleGetAll(req, res, db)
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })


app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.listen(PORT, '0.0.0.0', () => {
  console.log(`app is running on http://${HOST}:${PORT}`)
})