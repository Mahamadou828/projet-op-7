const bcrypt = require("bcrypt") ; 
const jwt = require("jsonwebtoken") ; 
const authToken = require("../function/ramdomNumber") ;

const conn = require("../connectionToDatabase") ; 

exports.signUp = (req , res , next) => {
 
    const user = JSON.parse(req.body.user) ; 
    const filename = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` ; 
    const id = authToken.ramdomNumber(20) ;  

    const verifyEmail = function (user , callback , id , file , respond) {

        conn.query("SELECT email FROM user WHERE email=?" , [user.email] , (error , data) => {
            if (error) {
                callback(false , respond) ; 
            } else if (data.length === 0 ) 
            {
                callback(true , respond , user , id , file) ; 
            } else {
                callback (false , respond) ; 
            }
        })
    } ; 

    const registerUser = function (authorize , respond , user , id , file) {

        if (!authorize) 
        {
            respond.status(400).json({
                message: "Error this email already exist" , 
                createUser: false
            }) ; 
        } else {
        bcrypt.hash(user.password , 10)
        .then((password) => {
            conn.query(
                `INSERT INTO user (id_user , email , password , name , surname , photo , description) VALUES (? , ? , ? ,? ,? ,? ,?)` , 
                [id , user.email , password , user.name , user.surname , file , user.description] , 
                (error , res) => {
                    if(error) 
                    {
                        throw error ; 
                    }
                }   
            )
        })
        .catch((error) => {throw error}) ; 

        respond.status(201).json({
            message: "Welcome" ,  
            createUser: true , 
            id_user: id ,
            token: jwt.sign(
                {id_user: id} , 
                authToken.token , 
                {expiresIn: "24h"}
            ) , 
        })}
    } ; 

    verifyEmail(user , registerUser , id , filename , res) ; 

}

exports.logIn = (req , res , next) => {
    
    const data = req.body; 

    const verifyEmail = function (data , callback , respondServerFunc , respond) {

        conn.query("SELECT email FROM user WHERE email=?" , [data.email] , (error , rows) => {

            if (error) {
                callback(false , respond , "Internal problem with server") ; 
            } else if (rows.length === 1) {
                callback (true , respond , "" ,  data , respondServerFunc) ; 
            } else {
                callback(false , respond , "No valid email or password") ; 
            }
        })
    } ; 

    const verifyPassword = function (access , respond , message , data , callback) {
        
        if (!access) 
        {
            respond.status(400).json({
                message: message , 
                access: false 
            })
        } else {
            conn.query("SELECT password , id_user FROM user WHERE email=?" , [data.email] , (error , rows) => {
                if (error) {
                    callback(false , respond , "InternalServer Error") ; 
                } else {
                    bcrypt.compare(data.password , rows[0].password)
                    .then((result) => {
                        if (!result) {
                            callback (false , respond , "No valid email or password") ; 
                        } else {
                            callback (true , respond , "" , rows[0].id_user) ; 
                        }
                    })
                }
            })
        }
    } ; 

    const getAccess = function (access , respond , message , id_user) {
        if (access) {
            respond.status(200).json({
                message: "Welcome" , 
                access: true , 
                id_user: id_user ,
                token: jwt.sign(  
                    {id_user: id_user} , 
                    authToken.token , 
                    {expiresIn: "24h"}
                ) ,
            })
        } else {
            respond.status(400).json({
                message: message , 
                access: false
            })
        }
    }

    verifyEmail(data , verifyPassword , getAccess , res) ; 
}

exports.getInformationOfAnUser = (req , res , next) => {
    const {id_user} = req.params ; 

    const getInformation = function(id_user , respond , callback) {
        conn.query("SELECT name , surname , photo , description FROM user WHERE id_user=?" , [id_user] , (error , row) => {
            if(error) {
                callback(false , respond)
            } else {
                callback(true , respond , row[0]) 
            }
        })
    }

    const sendRespond = function(access , respond , data) {
        if(access) {
            respond.status(200).json({
                success: true , 
                data: data
            })
        } else {
            respond.status(400).json({
                message: "An occurent error" , 
                access: false
            })
        }
    }
    getInformation(id_user , res , sendRespond) ;
}