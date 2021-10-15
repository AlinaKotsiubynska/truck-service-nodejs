const Truck = require('../models/truck.model')
const getCreatedDate = require('../helpers/getCreatedDate')
const CustomError = require('../helpers/classCustomError')
const { truckTypeSchema } = require('../helpers/validationSchemas/truckSchemas')


const TRUCK_REQUIRED_FIELDS = ['_id', 'created_by', 'assigned_to', 'type', 'status', 'created_date']

const getUserTrucks = async (req, res, next) => {
  try {
    const { _id } = req.verifiedUser

    const trucks = await Truck.find({ created_by: _id }, TRUCK_REQUIRED_FIELDS)

    res.status(200).json({ trucks })
    
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: 'Internal server error'})
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
      throw new CustomError(400, 'Please specify "text" parameter in request body')
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
      res.status(500).json({message: 'Internal server error'})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const getUserTruck = async (req, res, next) => {
  try {
    const { id: noteId } = req.params
    const note = await Truck.findById(noteId, NOTE_REQUIRED_FIELDS)
    if(!note) {
      throw new CustomError(400, `Truck with id ${noteId} not found`)
    }
    res.status(200).json({note})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: 'Internal server error'})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const updateUserTruck = async (req, res, next) => {
  try {
    const { id: noteId } = req.params
    const { text } = req.body
    if (!text) {
      throw new CustomError(400, 'Please specify "text" parameter in request body')
    }
    const note = await Truck.findByIdAndUpdate(noteId, { text: text })
    if(!note) {
      throw new CustomError(400, `Truck with id ${noteId} not found`)
    }
    res.status(200).json({message: 'Success'})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: 'Internal server error'})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const assignUserTruck = async (req, res, next) => {
  try {
    const { id: noteId } = req.params
    const note = await Truck.findOne({_id: noteId})
    if(!note) {
      throw new CustomError(400, `Truck with id ${noteId} not found`)
    }
    note.completed = !note.completed
    await note.save()
    res.status(200).json({message: 'Success'})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: 'Internal server error'})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}
const deleteUserTruck = async (req, res, next) => {
  try {
    const { id: noteId } = req.params
    const note = await Truck.findByIdAndRemove(noteId)
    if(!note) {
      throw new CustomError(400, `Truck with id ${noteId} not found`)
    }
    res.status(200).json({message: 'Success'})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: 'Internal server error'})
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