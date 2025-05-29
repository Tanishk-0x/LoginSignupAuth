const express = require('express') ;
const router = express.Router() ;
// importing middlewares ... 
const {loginValidation ,signupValidation} = require('../Middlewares/AuthValidation') ; 
// importing controllers ... 
const {login , signup} = require('../Controllers/AuthController')


// router.method( path , middleware , controller )
router.post('/login' , loginValidation , login ) ; 

router.post('/signup' , signupValidation , signup ) ; 


module.exports = router ; 