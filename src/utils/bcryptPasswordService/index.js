const { hashPassword, validateHashedPassword } = require('./bcryptPasswordService')

module.exports = {
  hashPassword,
  validateHashedPassword
}