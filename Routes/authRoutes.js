const router = require('express').Router()
const authController = require('../controllers/authController.js')

router.get('/register' , authController.registerPage)
router.post('/user-register' , authController.userRegister)


module.exports = router