const Truck = require('../models/truck.model')
const getCreatedDate = require('../helpers/getCreatedDate')
const CustomError = require('../helpers/classCustomError')

const NOTE_REQUIRED_FIELDS = ['_id', 'userId', 'completed', 'text', 'createdDate']

const getUserTrucks = async (req, res, next) => {
  try {
    const { _id } = req.verifiedUser
    const { offset, limit } = req.query
    const paginationOps = {
      skip: offset ? parseInt(offset) : 0,
      limit: limit ? parseInt(limit) : 0
    }
    const notes = await Truck.find({ userId: _id }, NOTE_REQUIRED_FIELDS)
      .skip(paginationOps.skip)
      .limit(paginationOps.limit)
    
    const resultObj = {
      offset: paginationOps.skip,
      limit: paginationOps.limit,
      count: notes.length,
      notes
    }
    res.status(200).json({ ...resultObj })
    
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
    const { text } = req.body
    if (!text) {
      throw new CustomError(400, 'Please specify "text" parameter in request body')
    }
    const newTruck = {
      text,
      userId: _id,
      createdDate: getCreatedDate()
      
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