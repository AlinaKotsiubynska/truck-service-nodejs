const { Schema, model, SchemaTypes } = require('mongoose')

const user = new Schema(
  {
    password: {
      type: SchemaTypes.String,
      required: [true, 'Password is required']
    },
    email: {
      type: SchemaTypes.String,
      required: [true, 'Email is required'],
      unique: true
    },
    username: {
      type: SchemaTypes.String,
      required: [true, 'Name is required'],
      unique: true
    },
    createdDate:
    {
      type: SchemaTypes.String,
      required: [true, 'Creation date is required']
    },
    role: {
      type: SchemaTypes.String,
      required: [true, 'Role is required']

    },
    token: {
      type: SchemaTypes.String,
      default: null
    }
  }
)

const User = model('users', user)

module.exports = User
