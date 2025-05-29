const express = require('express') ; 
const app = express() ; 
const cors = require('cors') ; 
require('dotenv').config() ; 
require('./Models/database') ; 

const UserRoute = require('./Routes/UserRoutes') ; 
const ProductRoute = require('./Routes/ProductRouter') ; 

// require from dotenv 
const port = process.env.PORT || 8000 ; 

// middlewares using 
app.use(cors()) ; 
app.use(express.json()) ; 

// mounting 
app.use('/auth' , UserRoute) ; 
app.use('/products' , ProductRoute)

// default route 
app.get('/' , (req,res) => {
    res.send("This is Dummy Route") 
});

// listening 
app.listen(port , () => {
    console.log(`Server is started successfully on port : ${port}`)
}); 

