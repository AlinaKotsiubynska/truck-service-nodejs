require('module-alias/register')
const { Router } = require('express')
const {
  getUserLoads,
  deleteUserLoad,
  createUserLoad,
  getUserLoad,
  updateUserLoad,
  getUserActiveLoads,
  triggerNextUserLoadState,
  postUserLoad,
  getLoadShippingInfo } = require('controllers/loads.controllers')
const {driverRoleValidator, shipperRoleValidator} = require('middlewares')

const router = Router()

router.get('/', getUserLoads) //+
router.get('/active', driverRoleValidator, getUserActiveLoads) //driver +
router.patch('/active/state', driverRoleValidator, triggerNextUserLoadState) //driver
router.get('/:id', getUserLoad) //+
router.put('/:id', shipperRoleValidator, updateUserLoad) //shipper +
router.delete('/:id', shipperRoleValidator, deleteUserLoad) //shipper +
router.post('/:id/post', shipperRoleValidator, postUserLoad) //shipper +
router.get('/:id/shipping_info', shipperRoleValidator, getLoadShippingInfo) //shipper +
router.post('/', shipperRoleValidator, createUserLoad) //shipper +

module.exports = router