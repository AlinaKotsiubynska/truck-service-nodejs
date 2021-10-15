const bcrypt = require('bcrypt');
const CustomError = require('./classCustomError')
const ROUNDS = 8;


const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, ROUNDS)
  return hashed
}

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
