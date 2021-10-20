const {TRUCK_SIZES} = require('../../constants')

const getRequiredTruckType = (load) => {
  const sizes = []

  for (let key in TRUCK_SIZES) {
    const loadFits = TRUCK_SIZES[key].payload > load.payload
      && TRUCK_SIZES[key].dimensions.width > load.dimensions.width
      && TRUCK_SIZES[key].dimensions.height > load.dimensions.height
      && TRUCK_SIZES[key].dimensions.length > load.dimensions.length
    if(loadFits) {
      sizes.push(key)
      }
  }
  return sizes
}

module.exports = {
  getRequiredTruckType
}