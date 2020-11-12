const handleProfile = (req, res, db) => {
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
  }

module.exports = {
  handleProfile
}