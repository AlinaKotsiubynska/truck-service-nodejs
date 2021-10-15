const { Schema, model } = require('mongoose')

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    username: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    createdDate:
    {
      type: String,
      required: [true, 'Creation date is required']
    },
    token: {
      type: String,
      default: null
    }
  }
)

const User = model('users', user)

module.exports = User
