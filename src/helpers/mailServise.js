const nodemailer = require('nodemailer')
const { MAIL_SETTINGS } = require('../configs/mail.config')

const mailServise = nodemailer.createTransport(MAIL_SETTINGS);

module.exports = {
  mailServise
}