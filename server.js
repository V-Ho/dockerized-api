const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const { PORT, HOST, DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = require('./config')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'vho',
      email: 'vho@mail.com',
      password: 'p@ssword',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@mail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

const checklogin = (email, password) => {
  const verifiedUser = database.users.filter(user => user.email === email && user.password === password)
  return verifiedUser.length > 0 ? 'success' : 'error'
}

app.get('/', (req, res) => {
  res.send(database.users)
})

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

app.post('/register', (req, res) => {
  const { email, name, password } = req.body
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  // db('users').insert({
  //   email: email,
  //   name: name
  // })
  res.json(database.users[database.users.length - 1])
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

app.listen(PORT, HOST, () => {
  console.log(`app is running on http://${HOST}:${PORT}`)
})