require('module-alias/register')
const { Router } = require('express')
const { getUserInfo, deleteUser, changeUserPassword } = require('controllers/users.controllers')
const jwtValidator = require('middlewares/jwtValidator')

const router = Router()

router.use('/me', jwtValidator)
router.get('/me', getUserInfo)
router.delete('/me', deleteUser)
router.patch('/me/password', changeUserPassword)


module.exports = router