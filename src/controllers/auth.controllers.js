const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const SECRET_KEY = require('../configs/auth.config')
const CustomError = require('../helpers/classCustomError')
const getCreatedDate = require('../helpers/getCreatedDate')
const { validateHashedPassword, hashPassword } = require('../helpers/bcryptPasswordService')


const registerUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body
    const createdDate = getCreatedDate()
    const user = {
      email,
      username: email,
      role,
      createdDate,
      password: await hashPassword(password)
    }
    await User.create(user)

    res.status(200).json({ message: 'Profile created successfully' })
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(400).json({ message: error.message })
    }

  }
}

const loginUser = async (req, res, next) => {
  try {
    const candidate = req.body
    const user = await User.findOne({ email: candidate.email })
    if (!user) {
      throw new CustomError(400, 'Invalid email')
    }
    await validateHashedPassword(user.password, candidate.password)
    const payload = {
      email: user.email,
      _id: user['_id']
    }
    user.token = jwt.sign(payload, SECRET_KEY)
    await user.save()
    res.status(200).json({ jwt_token: user.token })
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(400).json({ message: error.message })
    }

  }
}

module.exports = { registerUser, loginUser }