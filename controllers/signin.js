const handleSignin = (db, bcrypt) => (req, res,) => {
  const { email, password } = req.body

   db.query('select email, hash from login where login.email = $1', email)
    .then(results => {
      if (results.length) {
        let user = results[0]
        const isValid = bcrypt.compareSync(password, user.hash)
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
}

module.exports = {
  handleSignin
}