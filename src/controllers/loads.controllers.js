const Load = require('../models/load.model')
const Truck = require('../models/truck.model')
const CustomError = require('../helpers/classCustomError')
const getCreatedDate = require('../helpers/getCreatedDate')
const { joiValidationService } = require('../helpers/joiValidationService')
const {defineFilterByRole} = require('../helpers/defineFilterByRole')
const {loadTruckMatcher} = require('../helpers/loadTruckMatcher')
const { newLoadSchema, getLoadsSchema, updateLoadSchema } = require('../helpers/validationSchemas/loadSchemas')
const {
  LOADS_PAGINATION_OPTS: { LIMIT, OFFSET },
  TRUCK_REQUIRED_FIELDS,
  LOAD_STATUS,
  LOAD_STATE_TRANSITIONS,
  TRUCK_STATUS,
  LOAD_REQUIRED_FIELDS } = require('../helpers/constants')



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
      res.status(500).json({message: error.message})
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
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const updateUserLoad = async (req, res, next) => {
  try {
    const { id: loadId } = req.params
    const newLoadInfo = req.body

    if (!newLoadInfo) {
      throw new CustomError(400, 'Please specify load parameters in request body')
    }

    joiValidationService(updateLoadSchema, newLoadInfo)

    let load = await Load.findById(loadId)
    if(!load) {
      throw new CustomError(400, `Load with id ${loadId} not found`)
    }

    if (load.status !== LOAD_STATUS.NEW) {
      throw new CustomError(400, `Updating is not allowed for status ${load.status}`)
    }

    for (let key in newLoadInfo) {
      load[key] = newLoadInfo[key]
    }

    load.save()
    res.status(200).json({message: 'Load details changed successfully'})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(error.status || 400).json({message: error.message})
    }

  }
}

const getUserActiveLoads = async (req, res, next) => {
  try {
    const { _id } = req.verifiedUser
    
    const load = await Load.findOne({ assigned_to: _id })
    if (!load) {
      throw new CustomError(400, `User has no active loads`)
    }
    res.status(200).json({load})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}
const deleteUserLoad = async (req, res, next) => {
  try {
    const { id: loadId } = req.params
    const load = await Load.findById(loadId)
    if(!load) {
      throw new CustomError(400, `Load with id ${loadId} not found`)
    }
    if (load.status !== LOAD_STATUS.NEW) {
      throw new CustomError(400, `Deleting is not allowed for status ${load.status}`)
    }

    load.remove()
    res.status(200).json({message: 'Success'})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}
const triggerNextUserLoadState = async (req, res, next) => {
  try {
    const { _id} = req.verifiedUser
    const load = await Load.findOne({assigned_to: _id})
    if(!load) {
      throw new CustomError(400, `User has no active loads`)
    }
    if (load.status !== LOAD_STATUS.ASSIGNED) {
      throw new CustomError(400, `Forbidden for current load status`)
    }
    const stateTransitionIndex = LOAD_STATE_TRANSITIONS.indexOf(load.state)
    const newState = LOAD_STATE_TRANSITIONS[stateTransitionIndex + 1]
    if (stateTransitionIndex === 2) {
      const truck = await Truck.findOneAndUpdate({ assigned_to: _id }, { status: TRUCK_STATUS.IS })
      load.status = LOAD_STATUS.SHIPPED
    }
    load.state = newState
    load.logs.push({
      message: newState,
      time: getCreatedDate()
    })
    await load.save()
  
    res.status(200).json({message: `Load state changed to ${newState}`})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}
const postUserLoad = async (req, res, next) => {
  try {
    const { id: loadId } = req.params
    const load = await Load.findById(loadId)
    if(!load) {
      throw new CustomError(400, `Load with id ${loadId} not found`)
    }
    if (load.status !== LOAD_STATUS.NEW) {
      throw new CustomError(400, `Posting is only allowed for status NEW, not for status ${load.status}`)
    }
    load.status = LOAD_STATUS.POSTED
    await load.save()


    const truck = await loadTruckMatcher(load)
    if (!truck) {
      load.status = LOAD_STATUS.NEW
      await load.save()
      throw new CustomError(400, 'No truck for the current load is available now. Please, try later.')
    }
    load.assigned_to = truck.assigned_to
    load.state = LOAD_STATE_TRANSITIONS[0]
    load.status = LOAD_STATUS.ASSIGNED
    load.logs.push({
      message: `Load assigned to driver with id ${truck.assigned_to}`,
      time: getCreatedDate()
    })
    await load.save()

    truck.status = TRUCK_STATUS.OL
    await truck.save()

    res.status(200).json({message: 'Load posted successfully', driver_found: true})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}
const getLoadShippingInfo = async (req, res, next) => {
  try {
    const { id: loadId } = req.params
    const load = await Load.findById(loadId, LOAD_REQUIRED_FIELDS)
    if(!load) {
      throw new CustomError(400, `Load with id ${loadId} not found`)
    }
    let truck = null
    if (load.assigned_to) {
      truck = await Truck.findOne({assigned_to: load.assigned_to}, TRUCK_REQUIRED_FIELDS)
    }
    res.status(200).json({load: load, truck: truck})
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: error.message})
    } else {
    res.status(400).json({message: error.message})
    }

  }
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