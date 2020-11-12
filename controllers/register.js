const handleRegister = (req, res, db, bcrypt) => {
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
}

module.exports = {
  handleRegister
}