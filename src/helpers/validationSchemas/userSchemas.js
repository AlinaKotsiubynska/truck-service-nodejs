require('module-alias/register')
const Joi = require('joi')
const {USER_ROLE} = require('helpers/constants')

const registerUserSchema = Joi.object({
  email: Joi.string().pattern(/^[a-zA-Z0-9.]{3,}@[a-zA-Z0-9]+[.]+[a-zA-Z0-9]+$/).required(),
  password: Joi.string().min(1).required(),
  role: Joi.string().pattern(new RegExp(`${USER_ROLE.DRIVER}|${USER_ROLE.SHIPPER}`)).required()
})

const loginUserSchema = Joi.object({
  email: Joi.string().min(1).required(),
  password: Joi.string().min(1).required()
})

const changeUserPasswordSchema = Joi.object({
  oldPassword: Joi.string().min(1).required(),
  newPassword: Joi.string().min(1).invalid(Joi.ref('oldPassword')).required()
})

const forgetPasswordSchema = Joi.object({
  email: Joi.string().min(1).required()
})

module.exports = {
  registerUserSchema,
  loginUserSchema,
  changeUserPasswordSchema,
  forgetPasswordSchema
}