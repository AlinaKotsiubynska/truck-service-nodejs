require('module-alias/register')
const { getCreatedDate } = require('utils/getCreatedDate')
const createLog = (message) => {
  return {
    message,
    time: getCreatedDate()
  }
}

module.exports = {
  createLog
}