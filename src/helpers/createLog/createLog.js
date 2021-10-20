require('module-alias/register')
const getCreatedDate =require('helpers/getCreatedDate')
const createLog = (message) => {
  return {
    message,
    time: getCreatedDate()
  }
}

module.exports = {
  createLog
}