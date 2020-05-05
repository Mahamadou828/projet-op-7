const multer = require("../middleware/multer.config") ; 
const auth = require("../middleware/auth") ; 
const messageCtrl = require("../controllers/messageCtrl") ; 

const express = require("express") ; 
const router = express.Router() ; 

router.use((req , res , next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*") ; 
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization") ; 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS") ; 
    next() ;
}) ;

router.get("/getallcontact/:id_user" , messageCtrl.getAllContact) ; 
router.get("/getallusercontact" , messageCtrl.getAllUserContact) ; 
router.get("/getallmessage/:id_contact" , messageCtrl.getAllMessage) ; 

module.exports = router ;