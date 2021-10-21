require('module-alias/register')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('configs/auth.config')


const jwtGenerator = ({email, _id}) => {
  const payload = {
      email,
      _id
  }
  if ( !_id || !_id.trim()) {
    throw new Error('_id is required')
  }
  return jwt.sign(payload, SECRET_KEY)
}

module.exports = {
  jwtGenerator
}