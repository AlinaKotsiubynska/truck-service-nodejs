// const nodemailer = require('nodemailer')
// const { MAIL_SETTINGS } = require('../configs/mail.config')

// const mailServise = nodemailer.createTransport(MAIL_SETTINGS);

const mailServise = require('@sendgrid/mail')
require('dotenv').config()
mailServise.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {
  mailServise
}