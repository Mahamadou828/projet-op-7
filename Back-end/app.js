const express = require("express") ; 
 
const bodyParser = require("body-parser") ; 
const userRoute = require("./routes/userRoute") ; 
const postRoute = require("./routes/postRoute") ; 

const app = express() ; 

app.use(bodyParser.json()) ; 

app.use("/user" , userRoute) ; 
app.use("/post" , postRoute) ; 

module.exports = app ;
