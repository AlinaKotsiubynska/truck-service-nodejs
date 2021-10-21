require('dotenv').config()
const mailServise = require('@sendgrid/mail')
mailServise.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {
  mailServise
}