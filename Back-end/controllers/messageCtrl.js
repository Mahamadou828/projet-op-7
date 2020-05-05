const conn = require("../connectionToDatabase") ; 

exports.getAllContact = (req , res , next) => {

    const {id_user} = req.params ; 

    const getContact = function(id , respond , callback) {
        conn.query("SELECT user.id_user , user.name , user.surname , user.photo , message.content AS lastMessage FROM message INNER JOIN user ON user.id = message.sender WHERE message.sender = ? ORDER BY message.date DESC LIMIT 1" , [id] , (error , rows) => {
            if(error) {
                callback(false , respond) ; 
            } else {
                callback(true , respond , rows) ; 
            }
        })
    }

    const sendResponse = function (access, respond , data=null) {
        if(access) {
            respond.status(200).json({
                success: true , 
                contact: data
            })
        } else 
        {
            respond.status(400).json({
                success: false , 
                error: 400
            })
        }
    }

    getContact(id_user , res , sendResponse) ; 
}

exports.getAllUserContact = (req , res , next) => {
    
    const getUser = function(callback , respond) {
        conn.query("SELECT id_user , name , surname , photo , description AS lastMessage FROM user" , (error , rows) => {
            if(error) {
                callback(false , respond)
            } else {
                callback(true , respond , rows)
            }
        })
    }

    const sendResponse = function(access , respond , data=null) {
        if(access) {
            respond.status(200).json({
                success: true , 
                user: data
            })
        } else {
            respond.status(400).json({
                success: false , 
                error: 400
            })
        }
    }

    getUser(sendResponse , res) ; 
}

exports.getAllMessage = (req , res , next) => {

    const {id_contact} = req.params ; 

    const getMessage = function(id , callback , respond) {
        conn.query("" , [id] ,  (error , rows) => {
            if(error) {
                callback(false , respond) ; 
            } else {
                callback(true , respond , rows) ; 
            }
        })
    }

    const sendResponse = function(access , respond , data=null) {
        if(access) {
            respond.status(200).json({
                success: true , 
                user: data
            })
        } else {
            respond.status(400).json({
                success: false , 
                error: 400
            })
        }
    }

    getMessage(id_contact , sendResponse , callback) ; 
}