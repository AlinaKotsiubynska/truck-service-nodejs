require('module-alias/register')
const { Router } = require('express')
const {
  getUserTrucks,
  deleteUserTruck,
  assignUserTruck,
  createUserTruck,
  getUserTruck,
  updateUserTruck } = require('controllers/trucks.controllers')

const router = Router()

router.get('/', getUserTrucks)
router.post('/', createUserTruck)
router.get('/:id', getUserTruck)
router.put('/:id', updateUserTruck)
router.delete('/:id', deleteUserTruck)
router.post('/:id/assign', assignUserTruck)

module.exports = router