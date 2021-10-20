const Truck = require('../models/truck.model')
const getCreatedDate = require('../helpers/getCreatedDate')
const CustomError = require('../helpers/classCustomError')
const { truckTypeSchema } = require('../helpers/validationSchemas/truckSchemas')
const {TRUCK_REQUIRED_FIELDS, TRUCK_STATUS} = require('../helpers/constants')

const getUserTrucks = async (req, res, next) => {
  try {
    const { _id } = req.verifiedUser

    const trucks = await Truck.find({ created_by: _id }, TRUCK_REQUIRED_FIELDS)

    res.status(200).json({ trucks })
    
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const createUserTruck = async (req, res, next) => {
  try {
    const {_id} = req.verifiedUser
    const { type } = req.body
    if (!type) {
      throw new CustomError(400, 'Please specify "type" parameter in request body')
    }
    const { error } = truckTypeSchema.validate({ type })
    if (error) {
      throw new CustomError(400, error.message)
    }
    const newTruck = {
      type,
      created_by: _id,
      created_date: getCreatedDate()
    }
    Truck.create(newTruck)
    res.status(200).json({message: 'Success'})
    
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const getUserTruck = async (req, res, next) => {
  try {
    const { id } = req.params
    const truck = await Truck.findById( id ,TRUCK_REQUIRED_FIELDS)
    if(!truck) {
      throw new CustomError(400, `Truck with id ${id} not found`)
    }
    res.status(200).json({truck})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const updateUserTruck = async (req, res, next) => {
  try {
    const { id } = req.params
    const { type } = req.body
    const { _id } = req.verifiedUser
    if (!type) {
      throw new CustomError(400, 'Please specify "type" parameter in request body')
    }
    const { error } = truckTypeSchema.validate({ type })
    if (error) {
      throw new CustomError(400, error.message)
    }
    const truck = await Truck.findById(id)
    if (truck.assigned_to === _id || truck.status === TRUCK_STATUS.OL) {
      throw new CustomError(400, `Truck info can not be changed now`)
    }
    if(!truck) {
      throw new CustomError(400, `Truck with id ${id} not found`)
    }
    res.status(200).json({message: 'Truck details changed successfully'})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const assignUserTruck = async (req, res, next) => {
  try {
    const { _id: userId } = req.verifiedUser
    const { id: truckId } = req.params
    const truck = await Truck.findByIdAndUpdate(truckId, {assigned_to: userId})
    if(!truck) {
      throw new CustomError(400, `Truck with id ${truckId} not found`)
    }
    truck.completed = !truck.completed
    await truck.save()
    res.status(200).json({message: 'Truck assigned successfully'})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}
const deleteUserTruck = async (req, res, next) => {
  try {
    const { _id: userId } = req.verifiedUser
    const { id } = req.params
    const truck = await Truck.findByIdAndRemove(id, {created_by: userId})
    if(!truck) {
      throw new CustomError(400, `Truck with id ${id} not found`)
    }
    if (truck.assigned_to === userId || truck.status === TRUCK_STATUS.OL) {
      throw new CustomError(400, `Truck info can not be changed now`)
    }
    res.status(200).json({message: 'Truck deleted successfully'})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}



module.exports = {
  getUserTrucks,
  deleteUserTruck,
  assignUserTruck,
  createUserTruck,
  getUserTruck,
  updateUserTruck }