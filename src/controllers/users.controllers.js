const User = require('../models/user.model')
const Note = require('../models/note.model')
const { validateHashedPassword, hashPassword } = require('../helpers/bcryptPasswordService')

const USER_REQUIRED_FIELDS = ['_id', 'username', 'createdDate']

const getUserInfo = async (req, res, next) => {
  try {
    const { _id } = req.verifiedUser
    const user = await User.findById(_id, USER_REQUIRED_FIELDS)
    res.status(200).json({ user })
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: 'Internal server error' })
    } else {
      res.status(400).json({ message: error.message })
    }

  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.verifiedUser
    await User.findByIdAndDelete(_id)
    await Note.deleteMany({ userId: _id })
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: 'Internal server error' })
    } else {
      res.status(400).json({ message: error.message })
    }

  }
}

const changeUserPassword = async (req, res, next) => {
  try {
    const { _id } = req.verifiedUser
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(_id)
    await validateHashedPassword(user.password, oldPassword)
    user.password = await hashPassword(newPassword)
    await user.save()
    res.status(200).json({ 'message': 'Success' })
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: 'Internal server error' })
    } else {
      res.status(400).json({ message: error.message })
    }

  }

}


module.exports = { getUserInfo, deleteUser, changeUserPassword }