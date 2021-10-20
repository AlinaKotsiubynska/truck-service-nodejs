const USER_ROLE = {
  SHIPPER: 'SHIPPER',
  DRIVER: 'DRIVER'
}

const TRUCK_TYPE = {
  SPRINTER: 'SPRINTER',
  SMALL_STRAIGHT: 'SMALL STRAIGHT',
  LARGE_STRAIGHT: 'LARGE STRAIGHT'
}

const TRUCK_SIZES = {
  [TRUCK_TYPE.SPRINTER]: {
    payload: 1700,
    dimensions: {
      width: 170,
      length: 300,
      height: 250
    }
  },
  [TRUCK_TYPE.SMALL_STRAIGHT]: {
    payload: 2500,
    dimensions: {
      width: 170,
      length: 500,
      height:250
    }
  },
  [TRUCK_TYPE.LARGE_STRAIGHT]: {
    payload: 4000,
    dimensions: {
      width: 200,
      length: 700,
      height: 350
    }
  }
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

const LOAD_STATE_TRANSITIONS = [
  'En route to Pick Up',
  'Arrived to Pick Up',
  'En route to delivery',
  'Arrived to delivery'
]

const LOAD_REQUIRED_FIELDS = ['_id', 'created_by', 'assigned_to', 'status', 'state', 'name',
  'payload', 'pickup_address', 'delivery_address', 'dimensions', 'logs', 'created_date']

const TRUCK_REQUIRED_FIELDS = ['_id', 'created_by', 'assigned_to', 'type', 'status', 'created_date']

module.exports = {
  USER_ROLE,
  TRUCK_TYPE,
  TRUCK_STATUS,
  LOAD_STATUS,
  LOADS_PAGINATION_OPTS,
  TRUCK_SIZES,
  LOAD_STATE_TRANSITIONS,
  LOAD_REQUIRED_FIELDS,
  TRUCK_REQUIRED_FIELDS
}