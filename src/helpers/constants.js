const USER_ROLE = {
  SHIPPER: 'SHIPPER',
  DRIVER: 'DRIVER'
}

const TRUCK_TYPE = {
  SPRINTER: 'SPRINTER',
  SMALL_STRAIGHT: 'SMALL STRAIGHT',
  LARGE_STRAIGHT: 'LARGE STRAIGHT'
}

const TRUCK_STATUS = {
  OL: 'OL', //on load
  IS: 'IS' // in service
}

const LOAD_STATUS = {
  NEW: 'NEW', //for just created but not posted yet loads
  POSTED: 'POSTED', //user posted his load, searching for driver
  ASSIGNED: 'ASSIGNED', //driver found and assigned
  SHIPPED: 'SHIPPED' // finished shipment, history
}

const LOADS_PAGINATION_OPTS = {
  LIMIT: {
    default: 0,
    max: 50
  },
  OFFSET: {
    default: 0
  }
}


module.exports = {
  USER_ROLE,
  TRUCK_TYPE,
  TRUCK_STATUS,
  LOAD_STATUS,
  LOADS_PAGINATION_OPTS
}