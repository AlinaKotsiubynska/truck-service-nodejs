const Load = require('../models/load.model')
const getCreatedDate = require('../helpers/getCreatedDate')
const { joiValidationService } = require('../helpers/joiValidationService')
const {defineFilterByRole} = require('../helpers/defineFilterByRole')
const { newLoadSchema, getLoadsSchema } = require('../helpers/validationSchemas/loadSchemas')
const CustomError = require('../helpers/classCustomError')
const { LOADS_PAGINATION_OPTS: {LIMIT, OFFSET} } = require('../helpers/constants')

const LOAD_REQUIRED_FIELDS = ['_id', 'created_by', 'assigned_to', 'status', 'state', 'name',
  'payload', 'pickup_address', 'delivery_address', 'dimensions', 'logs', 'created_date']

const getUserLoads = async (req, res, next) => {
  try {
    const { _id } = req.verifiedUser
    const { offset, limit, status } = req.query
    const role = req.userRole

    joiValidationService(getLoadsSchema, { offset, limit, status })

    const paginationOps = {
      skip: offset ? parseInt(offset) : OFFSET.default,
      limit: limit ? parseInt(limit) : LIMIT.default
    }

    const filter = defineFilterByRole(role, _id, status)

    const loads = await Load.find(filter, LOAD_REQUIRED_FIELDS)
      .skip(paginationOps.skip)
      .limit(paginationOps.limit)
      
    
    res.status(200).json({ loads: loads })
    
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const createUserLoad = async (req, res, next) => {
  try {
    const {_id} = req.verifiedUser
    const load = req.body
    if (!load) {
      throw new CustomError(400, 'Please specify load parameters in request body')
    }
    joiValidationService(newLoadSchema, load)
    const newLoad = {
      ...load,
      created_by: _id,
      created_date: getCreatedDate()
    }
    Load.create(newLoad)
    res.status(200).json({message: 'Load created successfully'})
    
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: 'Internal server error'})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const getUserLoad = async (req, res, next) => {
  try {
    const { id: loadId } = req.params
    const load = await Load.findById(loadId, LOAD_REQUIRED_FIELDS)
    if(!load) {
      throw new CustomError(400, `Load with id ${loadId} not found`)
    }
    res.status(200).json({load})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: 'Internal server error'})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const updateUserLoad = async (req, res, next) => {
  // try {
  //   const { id: noteId } = req.params
  //   const { text } = req.body
  //   if (!text) {
  //     throw new CustomError(400, 'Please specify "text" parameter in request body')
  //   }
  //   const note = await Load.findByIdAndUpdate(noteId, { text: text })
  //   if(!note) {
  //     throw new CustomError(400, `Load with id ${noteId} not found`)
  //   }
  //   res.status(200).json({message: 'Success'})
  // } catch (error) {
  //       if(!error.status) {
  //     res.status(500).json({message: 'Internal server error'})
  //   } else {
  //   res.status(400).json({message: error.message})
  //   }

  // }
}

const getUserActiveLoads = async (req, res, next) => {
  // try {
  //   const { id: noteId } = req.params
  //   const note = await Load.findOne({_id: noteId})
  //   if(!note) {
  //     throw new CustomError(400, `Load with id ${noteId} not found`)
  //   }
  //   note.completed = !note.completed
  //   await note.save()
  //   res.status(200).json({message: 'Success'})
  // } catch (error) {
  //       if(!error.status) {
  //     res.status(500).json({message: 'Internal server error'})
  //   } else {
  //   res.status(400).json({message: error.message})
  //   }

  // }
}
const deleteUserLoad = async (req, res, next) => {
  // try {
  //   const { id: noteId } = req.params
  //   const note = await Load.findByIdAndRemove(noteId)
  //   if(!note) {
  //     throw new CustomError(400, `Load with id ${noteId} not found`)
  //   }
  //   res.status(200).json({message: 'Success'})
  // } catch (error) {
  //       if(!error.status) {
  //     res.status(500).json({message: 'Internal server error'})
  //   } else {
  //   res.status(400).json({message: error.message})
  //   }

  // }
}
const triggerNextUserLoadState = async (req, res, next) => {
  // try {
  //   const { id: noteId } = req.params
  //   const note = await Load.findByIdAndRemove(noteId)
  //   if(!note) {
  //     throw new CustomError(400, `Load with id ${noteId} not found`)
  //   }
  //   res.status(200).json({message: 'Success'})
  // } catch (error) {
  //       if(!error.status) {
  //     res.status(500).json({message: 'Internal server error'})
  //   } else {
  //   res.status(400).json({message: error.message})
  //   }

  // }
}
const postUserLoad = async (req, res, next) => {
  // try {
  //   const { id: noteId } = req.params
  //   const note = await Load.findByIdAndRemove(noteId)
  //   if(!note) {
  //     throw new CustomError(400, `Load with id ${noteId} not found`)
  //   }
  //   res.status(200).json({message: 'Success'})
  // } catch (error) {
  //       if(!error.status) {
  //     res.status(500).json({message: 'Internal server error'})
  //   } else {
  //   res.status(400).json({message: error.message})
  //   }

  // }
}
const getLoadShippingInfo = async (req, res, next) => {
  // try {
  //   const { id: noteId } = req.params
  //   const note = await Load.findByIdAndRemove(noteId)
  //   if(!note) {
  //     throw new CustomError(400, `Load with id ${noteId} not found`)
  //   }
  //   res.status(200).json({message: 'Success'})
  // } catch (error) {
  //       if(!error.status) {
  //     res.status(500).json({message: 'Internal server error'})
  //   } else {
  //   res.status(400).json({message: error.message})
  //   }

  // }
}



module.exports = {
  getUserLoads,
  getUserLoad,
  getUserActiveLoads, //driver
  triggerNextUserLoadState, //driver
  createUserLoad, //shipper +
  updateUserLoad, //shipper
  deleteUserLoad, //shipper
  postUserLoad, //shipper
  getLoadShippingInfo //shipper
}