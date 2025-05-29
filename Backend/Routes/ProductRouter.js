const express = require('express') ;
const router = express.Router() ;
// importing Middleware .. 
const ensureAuthenticated = require('../Middlewares/Auth');


router.get('/' , ensureAuthenticated , (req,res) => {

    console.log(' --- logged in user details ---' , req.user) ; 
    res.status(200).json([
        {
            name : "earbuds" ,
            price : 1000 
        }, 
        {
            name : "mobile" , 
            price : 12000
        }
    ]);

});


module.exports = router ; 