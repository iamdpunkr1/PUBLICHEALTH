const express = require('express')
const {loginPatient, signupPatient} = require('../controller/patientController')
const {loginDoctor, signupDoctor} = require('../controller/doctorController')
const {loginAdmin} = require('../controller/adminController')

const router = express.Router()

//patient routes 
router.post('/login',loginPatient)
router.post('/signup',signupPatient)
//admin routes
router.post('/adminLogin',loginAdmin)
//doctor routes 
router.post('/loginDoctor',loginDoctor)
router.post('/signupDoctor',signupDoctor)
module.exports=router
