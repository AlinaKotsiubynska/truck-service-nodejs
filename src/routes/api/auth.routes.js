require('module-alias/register')
const { Router } = require('express')
const router = Router();
const { registerUser, loginUser, forgetUserPassword } = require('controllers/auth.controllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot_password', forgetUserPassword);


module.exports = router;
