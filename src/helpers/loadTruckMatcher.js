require('module-alias/register')
const Truck = require('models/truck.model')
const CustomError = require('helpers/classCustomError')
const { getRequiredTruckType } = require('helpers/getRequiredTruckType')
const {TRUCK_STATUS} = require('helpers/constants')

const loadTruckMatcher = async (load) => {
  const truckTypes = getRequiredTruckType(load)
  if (truckTypes.length === 0) {
    throw new CustomError(400, 'Load is too big for any of trucks')
  }
  const condition = {
    type: { $in: truckTypes },
    status: TRUCK_STATUS.IS,
    assigned_to: {$ne: ''}
  }
  return await Truck.findOne(condition)
}

module.exports = {
  loadTruckMatcher
}



module.exports = {
  loadTruckMatcher
}