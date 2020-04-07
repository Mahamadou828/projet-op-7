const jwt = require("jsonwebtoken") ; 

module.exports = (req , res , next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] ; 
        const decodeToken = jwt.verify(token , "GROUPEMANIASECRETWORD") ; 
        const userId = decodeToken.userId ; 
        if(req.body.userId && req.body.userId !== userId)
        {
            throw "User ID invalide"
        } else {
            next() ; 
        }
    }
    catch {
        res.status(400).json({error:"Token invalide"}) ; 
    }
}