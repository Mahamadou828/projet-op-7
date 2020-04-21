const express = require("express") ; 
const router = express.Router() ; 
const imageCtrl = require("../controllers/imageCtrl") ;

router.use((req , res , next) => {
    res.setHeader("Access-Control-Allow-Origin", "*") ; 
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization") ; 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS") ; 
    next() ;
}) ;

router.get("/images/:nameFile" , imageCtrl.sendImage)

module.exports = router ; 