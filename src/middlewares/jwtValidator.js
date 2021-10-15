const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const SECRET_KEY = require('../configs/auth.config')
const CustomError = require('../helpers/classCustomError')

const jwtValidator = async (req, res, next) => {
  try {
    const auth = req.headers.authorization
    if (!auth) {
      throw new CustomError(400, 'Jwt token is not provided')
    }
    const token = auth.split(' ')[1]
    const verified = jwt.verify(token, SECRET_KEY)
    const currentUser = await User.findById(verified['_id'])

    if (!currentUser || currentUser.token !== token) {
      throw new CustomError(400, 'Invalid jwt token')
    }

    req.verifiedUser = verified
    next()
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message })
  }
}

module.exports = jwtValidator