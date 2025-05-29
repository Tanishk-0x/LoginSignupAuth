const Users = require('../Models/User') ; 
const bcrypt = require('bcrypt') ; 
const jwt = require('jsonwebtoken') ; 



const signup = async (req , res) => {

    try {
        // extract data from request ki body 
        const {name , email , password} = req.body ; 
        // check id user is already exist using (findone)
        const user = await Users.findOne({email}) ; 
        if(user){
            return res.status(409).json({
                success : false , 
                message : "user is already exist , you can login" 
            })
        }

        // create a entry to insert in DB 
        const userModel = new Users({ name , email , password }) ;
        // Hashing the Password using (bcrypt) .. 
        userModel.password = await bcrypt.hash(password , 10) ; 
        // saving to DB 
        await userModel.save() ; 
        // Signned UP 
        res.status(201).json({
            success : true , 
            message : "Signup SuccessFully"
        })

    }
    catch (error) {
        res.status(500).json({
            success : false , 
            message : "Internal Server Error" 
        })
    }

}



const login = async (req , res) => {

    try {
        // extract data from request ki body 
        const {email , password} = req.body ; 
        // Check if user is not Registered --> !SigneedUp
        const user = await Users.findOne({email}) ; 
        if(!user){
            return res.status(403).json({
                success : false , 
                message : "Auth failed email or password is wrong" 
            })
        }

        // check krenge DataBase_Password & UserEntered_Password Equal he ua nhi 
        const isPassEqual = await bcrypt.compare(password , user.password) ; 
        // If NOt Equal 
        if(!isPassEqual){
            return res.status(403).json({
                success : false , 
                message : "Auth failed email or password is wrong" 
            })
        }

        // Payload {actual data}
        const payload = {
            email : user.email , 
            _id : user._id 
        }

        // Creating JWT Token Using Sign_Method 
        const jwtToken = jwt.sign( payload , process.env.JWT_SECRET , {expiresIn : "24h"})
        
        // Loggged IN 
        res.status(200).json({
            success : true , 
            message : "Login SuccessFully" ,
            jwtToken , 
            email , 
            name : user.name 
        })

    }

    catch (error) {
        res.status(500).json({
            success : false , 
            message : "Internal Server Error" 
        })
    }
}


// Exporting The Controllers 
module.exports = { signup , login }
