const Joi = require('joi')

const newLoadSchema = Joi.object({
  name: Joi.string().min(1).required(),
  payload: Joi.number().positive().required(),
  pickup_address: Joi.string().min(1).required(),
  delivery_address: Joi.string().min(1).required(),
  dimensions: Joi.object({
    width: Joi.number().positive().required(),
    length: Joi.number().positive().required(),
    height: Joi.number().positive().required()
  })
})

module.exports = {
  newLoadSchema
}