const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../configs/auth.config')

const jwtGenerator = ({email, _id}) => {
  const payload = {
      email,
      _id
  }
  return jwt.sign(payload, SECRET_KEY)
}

module.exports = {
  jwtGenerator
}