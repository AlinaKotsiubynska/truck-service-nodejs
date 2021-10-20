const { Schema, model, SchemaTypes } = require('mongoose')

const truck = new Schema(
  {
    created_by: {
      type: SchemaTypes.String,
      required: [true, 'created_by is required']
    },
    assigned_to: {
      type: SchemaTypes.String,
      default: ''
    },
    created_date:
    {
      type: SchemaTypes.String,
      required: [true, 'Creation date is required']
    },
    type: {
      type: SchemaTypes.String,
      required: [true, 'type date is required']
    },
    status: {
      type: SchemaTypes.String,
      default: 'IS'
    }
  }
)

const Truck = model('trucks', truck)

module.exports = Truck