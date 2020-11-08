const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('body-parser')
const cors = require('cors')
const { pool, PORT, HOST } = require('./config')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  pool.query('SELECT * FROM users')
  .then(results => {
   res.status(200).json(results.rows)
  })
  .catch(err => res.status(400).json('No users found'))
})

app.post('/register', (req, res) => {
  const { email, name } = req.body
  pool.query(
    'INSERT INTO users (email, name, joined) VALUES ($1, $2, now())',
    [email, name])
    .then(user => {
      res.status(201).json({ status: 'success', message: 'user added'})
    })
    .catch(err => res.status(400).json('unable to register'))
})

const checklogin = (email, password) => {
  const verifiedUser = database.users.filter(user => user.email === email && user.password === password)
  return verifiedUser.length > 0 ? 'success' : 'error'
}


app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  pool.query(
    'SELECT * FROM users WHERE users.id = $1',
    [id])
    .then(results => {
      if (results.rows.length) {
        res.json(results.rows[0])
      } else {
        res.status(400).json('user not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`app is running on http://${HOST}:${PORT}`)
})