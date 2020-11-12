const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')
const { db, PORT, HOST } = require('./config')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  db.any('select * from users')
  .then(results => {
    res.status(200)
    .json({
      status: 'success',
      data: results,
      message: 'Retrieved all users'
    })
  }).catch(err => res.status(400).json('No users found'))
})

app.post('/signin', (req, res) => {
  const { email, password } = req.body

   db.query('select email, hash from login where login.email = $1', email)
    .then(results => {
      console.log('results', results)
      if (results.length) {
        let user = results[0]
        const isValid = bcrypt.compareSync(password, user.hash)
        console.log('isValid', isValid)
        if (isValid) {
          return db.query('select * from users where users.email = $1', email)
            .then(result => {
              let user = result[0]
             return res.status(200).json(user)
            })
            .catch(err => res.status(400).json('wrong credentials'))
        }
      }
      return res.status(400).json('wrong credentials')
    }).catch(err => res.status(400).json('unable to get user'))
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body

  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)

  return db.tx(t => { 
    return t.any('SELECT * from users where users.email = $1', [email])
      .then(results => {
        if (results.length) {
          throw new Error('user already exists')
          //return res.status(404).json('user already exists')
        } else {
          return t.batch([
            t.any('INSERT INTO users (email, name, joined) VALUES ($1, $2, now())', [email, name]),
            t.any('INSERT INTO login (hash, email) VALUES ($1, $2)', [hash, email])
          ])
        }
      })
  }).then(results => {
    return res.status(201).json({ status: 'success', message: 'user added'})
  }).catch(err => {
    console.log(err)
    return res.status(400).json('user not registered')
  })
})


app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  return db.any('SELECT * FROM users WHERE users.id = $1', [id])
    .then(results => {
      console.log('id res', results)
      if (results.length) {
        return res.json(results[0])
      } else {
        return res.status(400).json('user not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
  })

app.listen(PORT, '0.0.0.0', () => {
  console.log(`app is running on http://${HOST}:${PORT}`)
})