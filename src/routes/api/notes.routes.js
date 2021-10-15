const { Router } = require('express')
const {
  getUserNotes,
  deleteUserNote,
  toggleUserNoteStatus,
  createUserNote,
  getUserNote,
  editUserNote } = require('../../controllers/notes.controllers')
const jwtValidator = require('../../middlewares/jwtValidator')

const router = Router()

router.use('/', jwtValidator)
router.get('/', getUserNotes)
router.post('/', createUserNote)
router.get('/:id', getUserNote)
router.put('/:id', editUserNote)
router.patch('/:id', toggleUserNoteStatus)
router.delete('/:id', deleteUserNote)


module.exports = router