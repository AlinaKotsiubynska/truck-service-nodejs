require('module-alias/register')
const { CustomError } = require('utils/CustomError')

const joiValidationService = (schema, obj) => {
  const { error } = schema.validate(obj)
    if (error) {
      throw new CustomError(400, error.message)
    }
}

module.exports = {
  joiValidationService
}