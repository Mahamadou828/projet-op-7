const mysql = require("mysql") ;

const conn = mysql.createConnection({
    database: "groupemania" , 
    host: "localhost" , 
    user: "root" , 
    password: "" ,
}) ; 

conn.connect((error) => {
    if (error)
    {
        throw error ; 
    }
    console.log("Connected To Database") ; 
}) ; 

module.exports = conn ; 