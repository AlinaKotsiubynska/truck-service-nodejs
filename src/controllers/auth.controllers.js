require('module-alias/register')
const User = require('models/user.model')
const { jwtGenerator } = require('utils/jwtGenerator')
const { loginUserSchema,
  registerUserSchema,
  forgetPasswordSchema } = require('helpers/validationSchemas/userSchemas')
const { CustomError } = require('utils/CustomError')
const { getCreatedDate } = require('utils/getCreatedDate')
const { validateHashedPassword, hashPassword } = require('utils/bcryptPasswordService')
const { mailServise } = require('utils/mailServise')
const { getRandomPass } = require('utils/getRandomPass')


const registerUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body
    const { error } = registerUserSchema.validate({ email, password, role })
    if (error) {
      throw new CustomError(400, error.message)
    }
    const createdDate = getCreatedDate()
    const user = {
      email,
      role,
      username: email,
      created_date: createdDate,
      password: await hashPassword(password)
    }
    await User.create(user)

    res.status(200).json({ message: 'Profile created successfully' })
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(400).json({ message: error.message })
    }

  }
}

const loginUser = async (req, res, next) => {
  try {
    const candidate = req.body
    const { error } = loginUserSchema.validate(candidate)
    if (error) {
      throw new CustomError(400, error.message)
    }
    const user = await User.findOne({ email: candidate.email })
    if (!user) {
      throw new CustomError(400, 'Invalid email')
    }
    await validateHashedPassword(user.password, candidate.password)
    user.token = jwtGenerator(user)
    await user.save()
    res.status(200).json({ jwt_token: user.token })
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(400).json({ message: error.message })
    }

  }
}

const forgetUserPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const { error } = forgetPasswordSchema.validate({ email })
    if (error) {
      throw new CustomError(400, error.message)
    }
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new CustomError(400, 'Invalid email')
    }

    const newPass = getRandomPass()
    const hashedPass = await hashPassword(newPass)
    user.password = hashedPass
    await user.save()
    const mailOptions = {
      from: 'alinakotsiubynska@gmail.com',
      to: email,
      subject: 'Password reset',
      text: `Your new email is ${newPass}. Please, change it after next login`
    };
    await mailServise.send(mailOptions)

    res.status(200).json({ message: 'New password sent to your email address' })
  } catch (error) {
    if (!error.status) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(400).json({ message: error.message })
    }

  }
}

module.exports = { registerUser, loginUser, forgetUserPassword }