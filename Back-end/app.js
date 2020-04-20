const express = require("express") ; 
 
const bodyParser = require("body-parser") ; 
const userRoute = require("./routes/userRoute") ; 
const postRoute = require("./routes/postRoute") ; 
// const SocketLogic = require("./socketLogic") ; 

const app = express() ; 
 
app.use(bodyParser.json()) ; 
app.use(express.static("images")) ; 

app.use("/user" , userRoute) ; 
app.use("/post" , postRoute) ; 

// SocketLogic.connectSocket() ; 

module.exports = app ;
