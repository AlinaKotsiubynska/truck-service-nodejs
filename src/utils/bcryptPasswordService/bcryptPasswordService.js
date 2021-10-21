const bcrypt = require('bcrypt');
const { CustomError } = require('../CustomError')
const { BCRYPT_ROUNDS } = require('helpers/constants')

const hashPassword = async (password) => await bcrypt.hash(password, BCRYPT_ROUNDS)

const validateHashedPassword = async (hashedPassword, password) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword)
  if (!isPasswordValid) {
    throw new CustomError(400, 'Invalid password')
  }
}

module.exports = {
  hashPassword,
  validateHashedPassword
}
