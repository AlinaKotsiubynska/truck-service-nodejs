const Joi = require('joi')
const { LOAD_STATUS, LOADS_PAGINATION_OPTS } = require('../constants')

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

const updateLoadSchema = Joi.object({
  name: Joi.string().min(1),
  payload: Joi.number().positive(),
  pickup_address: Joi.string().min(1),
  delivery_address: Joi.string().min(1),
  dimensions: Joi.object({
    width: Joi.number().positive(),
    length: Joi.number().positive(),
    height: Joi.number().positive()
  }).min(1)
})

const getLoadsSchema = Joi.object({
  status: Joi.string().pattern(new RegExp(`${Object.values(LOAD_STATUS).join('|')}`)).optional(),
  limit: Joi.number().positive().max(LOADS_PAGINATION_OPTS.LIMIT.max).optional(),
  offset: Joi.number().positive().optional()

})

module.exports = {
  newLoadSchema,
  getLoadsSchema,
  updateLoadSchema
}