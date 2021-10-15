const mongoose = require('mongoose')
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING

const db = mongoose.connect(CONNECTION_STRING)

db.then(() => console.log('Database connection successful'))
  .catch(err => {
    console.log(err.message)
    process.exit(1)
  })

module.exports = { db }
