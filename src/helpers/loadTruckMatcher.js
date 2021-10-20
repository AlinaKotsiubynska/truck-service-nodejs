const Truck = require('../models/truck.model')
const CustomError = require('./classCustomError')
const { getRequiredTruckType } = require('./utils/getRequiredTruckType')
const {TRUCK_STATUS} = require('./constants')

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