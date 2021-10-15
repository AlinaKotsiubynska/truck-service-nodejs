const { Schema, model, SchemaTypes } = require('mongoose')

const truck = new Schema(
  {
    userId: {
      type: SchemaTypes.String,
      required: [true, 'userId is required']
    },
    text: {
      type: SchemaTypes.String,
      required: [true, 'Text is required']
    },
    createdDate:
    {
      type: SchemaTypes.String,
      required: [true, 'Creation date is required']
    },
    completed: {
      type: SchemaTypes.Boolean,
      default: false
    }
  }
)

const Truck = model('trucks', truck)

module.exports = Truck