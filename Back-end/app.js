const express = require("express") ; 
 
const bodyParser = require("body-parser") ; 
const userRoute = require("./routes/userRoute") ; 
const postRoute = require("./routes/postRoute") ; 
const imageRoute = require("./routes/imageRoute") ; 
const messageRoute = require("./routes/messageRoute") ; 
const app = express() ; 
 
app.use(bodyParser.json()) ; 
app.use(express.static("images")) ; 


app.use("/message" , messageRoute) ; 
app.use("/user" , userRoute) ; 
app.use("/post" , postRoute) ; 
app.use("/" , imageRoute) ;  

module.exports = app ;
