const handleGetAll = (db) => (req, res) => {
   db.any('select * from users')
  .then(results => {
    res.status(200)
    .json({
      status: 'success',
      data: results,
      message: 'Retrieved all users'
    })
  }).catch(err => res.status(400).json('No users found'))
}

module.exports = {
  handleGetAll
}