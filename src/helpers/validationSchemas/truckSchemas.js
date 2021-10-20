require('module-alias/register')
const Joi = require('joi')
const { TRUCK_TYPE } = require('helpers/constants')

const truckTypeSchema = Joi.object({
  type: Joi.string().pattern(new RegExp(`${Object.values(TRUCK_TYPE).join('|')}`)).required()
})

module.exports = {
  truckTypeSchema
}