const Note = require('../models/truck.model')
const getCreatedDate = require('../helpers/getCreatedDate')
const CustomError = require('../helpers/classCustomError')

const NOTE_REQUIRED_FIELDS = ['_id', 'userId', 'completed', 'text', 'createdDate']

const getUserNotes = async (req, res, next) => {
  try {
    const { _id } = req.verifiedUser
    const { offset, limit } = req.query
    const paginationOps = {
      skip: offset ? parseInt(offset) : 0,
      limit: limit ? parseInt(limit) : 0
    }
    const notes = await Note.find({ userId: _id }, NOTE_REQUIRED_FIELDS)
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

const createUserNote = async (req, res, next) => {
  try {
    const {_id} = req.verifiedUser
    const { text } = req.body
    if (!text) {
      throw new CustomError(400, 'Please specify "text" parameter in request body')
    }
    const newNote = {
      text,
      userId: _id,
      createdDate: getCreatedDate()
      
    }
    Note.create(newNote)
    res.status(200).json({message: 'Success'})
    
  } catch (error) {
        if(!error.status) {
      res.status(500).json({message: 'Internal server error'})
    } else {
    res.status(400).json({message: error.message})
    }

  }
}

const getUserNote = async (req, res, next) => {
  try {
    const { id: noteId } = req.params
    const note = await Note.findById(noteId, NOTE_REQUIRED_FIELDS)
    if(!note) {
      throw new CustomError(400, `Note with id ${noteId} not found`)
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

const editUserNote = async (req, res, next) => {
  try {
    const { id: noteId } = req.params
    const { text } = req.body
    if (!text) {
      throw new CustomError(400, 'Please specify "text" parameter in request body')
    }
    const note = await Note.findByIdAndUpdate(noteId, { text: text })
    if(!note) {
      throw new CustomError(400, `Note with id ${noteId} not found`)
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

const toggleUserNoteStatus = async (req, res, next) => {
  try {
    const { id: noteId } = req.params
    const note = await Note.findOne({_id: noteId})
    if(!note) {
      throw new CustomError(400, `Note with id ${noteId} not found`)
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
const deleteUserNote = async (req, res, next) => {
  try {
    const { id: noteId } = req.params
    const note = await Note.findByIdAndRemove(noteId)
    if(!note) {
      throw new CustomError(400, `Note with id ${noteId} not found`)
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
  getUserNotes,
  createUserNote,
  getUserNote,
  editUserNote,
  toggleUserNoteStatus,
  deleteUserNote
}