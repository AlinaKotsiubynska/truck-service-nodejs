require('module-alias/register')
const Truck = require('models/truck.model')
const { CustomError } = require('utils/CustomError')
const { getRequiredTruckType } = require('utils/getRequiredTruckType')
const {TRUCK_STATUS} = require('helpers/constants')


const loadTruckMatcher = async (load) => {
  const truckTypes = getRequiredTruckType(load)

  const TRUCK_MATCHER_CONDITIONS = {
      type: { $in: truckTypes },
      status: TRUCK_STATUS.IS,
      assigned_to: {$ne: ''}
    }

  if (truckTypes.length === 0) {
    throw new CustomError(400, 'Load is too big for any of trucks')
  }
  
  return await Truck.findOne(TRUCK_MATCHER_CONDITIONS)
}

module.exports = {
  loadTruckMatcher
}