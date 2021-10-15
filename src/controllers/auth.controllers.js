const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const SECRET_KEY = require('../configs/auth.config')
const CustomError = require('../helpers/classCustomError')
const getCreatedDate = require('../helpers/getCreatedDate')
const { validateHashedPassword, hashPassword } = require('../helpers/bcryptPasswordService')


const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const createdDate = getCreatedDate()
    const user = {
      username,
      createdDate,
      password: await hashPassword(password)
    }
    await User.create(user)

    res.status(200).json({ message: 'Success' })
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: 'Internal server error' })
    } else {
      res.status(400).json({ message: error.message })
    }

  }
}

const loginUser = async (req, res, next) => {
  try {
    const candidate = req.body
    const user = await User.findOne({ username: candidate.username })
    if (!user) {
      throw new CustomError(400, 'Invalid username')
    }
    await validateHashedPassword(user.password, candidate.password)
    const payload = {
      username: user.username,
      _id: user['_id']
    }
    user.token = jwt.sign(payload, SECRET_KEY)
    await user.save()
    res.status(200).json({ message: 'Success', jwt_token: user.token })
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: 'Internal server error' })
    } else {
      res.status(400).json({ message: error.message })
    }

  }
}

module.exports = { registerUser, loginUser }