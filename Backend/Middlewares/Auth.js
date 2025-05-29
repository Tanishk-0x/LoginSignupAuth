const jwt = require('jsonwebtoken') ;


const ensureAuthenticated = (req,res,next) => {
    
    // to get data from Headers ( key : value ) 
    // header se key : value type in which key is Authorization
    const auth = req.headers['authorization'] ; 
    if(!auth){
        return res.status(403).json({
            success : false , 
            message : "UnAuthorized , Jwt is required" 
        })
    }

    try {
        // It checks if the user's token (auth) is valid and not expired using a secret key (JWT_SECRET). If valid, it decodes the token and saves the user info in req.user
        // decode krega, check krega token shi he ya nhi ,expire to nhi ho gya 
        const decoded = jwt.verify(auth , process.env.JWT_SECRET) ; 
        req.user = decoded ; 
        next() ; 
    }
    
    catch (error) {
        return res.status(403).json({
            success : fale , 
            message : "Unauthorized , JWT Token is wrong or expired"
        });
    }

}

// Exporting .. 
module.exports = ensureAuthenticated ; 