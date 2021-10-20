const { Schema, model, SchemaTypes } = require('mongoose')
const {LOAD_STATUS} = require('../helpers/constants')

const load = new Schema(
  {
    created_by: {
      type: SchemaTypes.String,
      required: [true, 'created_by is required']
    },
    assigned_to: {
      type: SchemaTypes.String,
      default: ''
    },
    status: {
      type: SchemaTypes.String,
      default: LOAD_STATUS.NEW

    },
    state: {
      type: SchemaTypes.String,
      default: ''
    },
    name: {
      type: SchemaTypes.String,
      required: [true, 'Name is required']
    },
    payload: {
      type: SchemaTypes.Number,
      required: [true, 'Payload is required']
    },
    pickup_address: {
      type: SchemaTypes.String,
      required: [true, 'Pickup address is required']
    },
    delivery_address: {
      type: SchemaTypes.String,
      required: [true, 'Delivery address is required']
    },
    dimensions: {
      width: {
        type: SchemaTypes.Number,
        required: [true, 'Width is required']
      },
      length: {
        type: SchemaTypes.Number,
        required: [true, 'Length is required']
      },
      height: {
        type: SchemaTypes.Number,
        required: [true, 'Height is required']
      }

    },
    logs: {
      type: SchemaTypes.Array,
      of: {
        message: {
          type: SchemaTypes.String,
          required: [true, 'Log message is required']
        },
        time: {
          type: SchemaTypes.String,
          required: [true, 'Message time is required']
        }
      },
      default: []
    },
    created_date: {
      type: SchemaTypes.String,
      required: [true, 'Creation date is required']
    }
  }
)

const Load = model('loads', load)

module.exports = Load