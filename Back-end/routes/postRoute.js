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
router.post("/simplepost" , multer , postCtrl.createSimplePost) ; 
router.post("/getallpost" , postCtrl.getAllPost) ; 
router.post("/savepost" , postCtrl.savePost) ; 
router.post("/sendcomment" , postCtrl.sendComment) ;
router.get("/getonepost/:id" , postCtrl.getOnePost) ;
router.get("/getappreciationofanpost/:id_user/:id_post" , postCtrl.getAppreciationOfAnPost) ; 
router.get("/getcomment/:id_post" , postCtrl.getComment) ;

module.exports = router ; 