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
  getLoadShippingInfo } = require('../../controllers/loads.controllers')
const {driverRoleValidator, shipperRoleValidator} =require('../../middlewares')

const router = Router()

router.get('/', getUserLoads) 
router.post('/', shipperRoleValidator, createUserLoad) //shipper
router.get('/active', getUserActiveLoads) //driver
router.patch('/active/state', triggerNextUserLoadState) //driver
router.get('/:id', getUserLoad)
router.put('/:id', updateUserLoad) //shipper
router.delete('/:id', deleteUserLoad) //shipper
router.post('/:id/post', postUserLoad) //shipper
router.get('/:id/shipping_info', getLoadShippingInfo) //      shipper

module.exports = router