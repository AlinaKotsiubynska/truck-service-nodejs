require('module-alias/register')
const { USER_ROLE, DRIVER_ALLOWED_LOAD_STATUS, SHIPPER_ALLOWED_LOAD_STATUS } = require('helpers/constants')
const { CustomError } = require('utils/CustomError')

const defineAllowedStatus = (status, arr) => {
  if (!status) {
    return {$in: arr}
  }

  if (!arr.includes(status)) {
    throw new CustomError(400, `Status ${status} is not allowed for current role`)
  }
  return status
}

const defineFilterByRole = ({ role, id, status }) => {
  return role === USER_ROLE.DRIVER
      ? {
        status: defineAllowedStatus(status, DRIVER_ALLOWED_LOAD_STATUS),
        assigned_to: id
      }
      : {
        status: defineAllowedStatus(status, SHIPPER_ALLOWED_LOAD_STATUS),
        created_by: id
    }
}



module.exports = {
  defineFilterByRole
}