const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./src/configs/db.config')

const DEFAULT_PORT = 8080;
const PORT = process.env.PORT || DEFAULT_PORT;

const authRouter = require('./src/routes/api/auth.routes')
const usersRouter = require('./src/routes/api/users.routes')
const trucksRouter = require('./src/routes/api/trucks.routes')

const app = express()

app.use(logger('combined'))
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/trucks', trucksRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})