require('module-alias/register')
const CustomError = require('helpers/classCustomError')
const {USER_ROLE} = require('helpers/constants')

const driverRoleValidator = async (req, res, next) => {
  try {

    if (req.userRole !== USER_ROLE.DRIVER) {
      throw new CustomError(400, 'Not allowed for current user type')
    }

    next()
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message })
  }
}

module.exports = driverRoleValidator