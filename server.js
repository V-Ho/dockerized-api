const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const { PORT, HOST, DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = require('./config')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const db = knex({
  client: 'pg',
  connection: {
    host : `postgresdb`,
    user : `${DB_USER}`,
    password : `${DB_PASSWORD}`,
    database : `${DB_DATABASE}`
  }
})

db.select('*').from('users')
  .then(data => console.log(data))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send(db.users)
  console.log('get users')
})

app.post('/register', (req, res) => {
  const { email, name } = req.body

  db('users')
  .returning('*')
  .insert({
    email: email,
    name: name,
    joined: new Date()
  }).then(console.log)
})

const checklogin = (email, password) => {
  const verifiedUser = database.users.filter(user => user.email === email && user.password === password)
  return verifiedUser.length > 0 ? 'success' : 'error'
}


app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false
  database.users.forEach(user => {
    if(user.id === id) {
      found = true
      return res.json(user)
    } 
  })
  if (!found) {
    res.status(400).json('not found')
  }
})

app.post('/signin', (req, res) => {
  bcrypt.compare('')
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json('success')
  } else {
    res.status(400).json('error logging in')
  }
  res.json('signing in')
})

app.post('/image', (req, res) => {
  const { id } = req.body
  let found = false
  database.users.forEach(user => {
    if(user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    } 
  })
  if (!found) {
    res.status(400).json('not found')
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`app is running on http://${HOST}:${PORT}`)
})