const multer = require("../middleware/multer.config") ; 
const auth = require("../middleware/auth") ; 

const express = require("express") ; 
const router = express.Router() ; 
const postCtrl = require("../controllers/postCtrl") ;

router.use((req , res , next) => {
    res.setHeader("Access-Control-Allow-Origin", "*") ; 
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization") ; 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS") ; 
    next() ;
}) ;

router.post("/" , auth , multer) ; 
router.post("/simplepost" , multer , postCtrl.simplePost) ; 
router.post("/getallpost" , postCtrl.getAllPost) ; 
router.post("/registerimageforpost" , multer , postCtrl.registerFile) ;
router.post("/savepost" , postCtrl.savePost) ; 
router.get("/getonepost/:id" , postCtrl.getOnePost) ;

module.exports = router ; 