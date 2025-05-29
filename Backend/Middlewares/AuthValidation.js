// Joi = library to do server side validations like to validate email / password 
const Joi = require('joi') ; 


const signupValidation = (req,res,next) => {

    // Establish validation using Joi (validate : name , email , password )
    const schema = Joi.object({
        name : Joi.string().min(3).max(100).required() ,
        email : Joi.string().email().required() , 
        password : Joi.string().min(4).max(100).required() 
    }); 

    // This line checks if the data (req.body) matches the rules defined in schema.
    // If the data doesn't follow the rules, an error is created, 
    const {error} = schema.validate(req.body) ; 
    if(error){
        return res.status(400).json({
            success : false , 
            message : ("Bad Request" , error)
        })
    }

    next() ; // to move the next middleware / controller 

}


const loginValidation = (req,res,next) => {

    // Establish validation using Joi ( validate : email , password )
    const schema = Joi.object({
        email : Joi.string().email().required() , 
        password : Joi.string().min(4).max(100).required() 
    }); 

    // This line checks if the data (req.body) matches the rules defined in schema.
    // If the data doesn't follow the rules, an error is created, 
    const {error} = schema.validate(req.body) ; 
    if(error){
        return res.status(400).json({
            success : false , 
            message : ("Bad Request" , error)
        })
    }

    next() ; // to move the next middleware / controller 
}


// Exporting 
module.exports = { signupValidation , loginValidation }