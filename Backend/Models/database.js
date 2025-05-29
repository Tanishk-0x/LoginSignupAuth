const mongoose = require('mongoose') ; 
require('dotenv').config() ; 

const Mongo_url = process.env.MONGO_URL ; 

// function to establish connection to server and database , return promise 
mongoose.connect(Mongo_url)

.then( () => {
    console.log("DB Connect SuccessFully") ; 
})

.catch( (error) => {
    console.log("Error is DB Connection" , error) ; 
})