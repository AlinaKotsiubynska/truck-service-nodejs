const { USER_ROLE, LOAD_STATUS } = require('./constants')
const CustomError = require('./classCustomError')

const driverAllowedStatus = [LOAD_STATUS.ASSIGNED, LOAD_STATUS.SHIPPED]
const shipperAllowedStatus = [LOAD_STATUS.NEW, LOAD_STATUS.POSTED, LOAD_STATUS.ASSIGNED, LOAD_STATUS.SHIPPED]

const defineAllowedStatus = (status, arr) => {
  if (!status) {
    return {$in: arr}
  }

  if (!arr.includes(status)) {
    throw new CustomError(400, `Status ${status} is not allowed for current role`)
  }
  return status
}

const defineFilterByRole = (role, id, status) => {
  return role === USER_ROLE.DRIVER
      ? {
        status: defineAllowedStatus(status, driverAllowedStatus),
        assigned_to: id
      }
      : {
        status: defineAllowedStatus(status, shipperAllowedStatus),
        created_by: id
    }
}



module.exports = {
  defineFilterByRole
}