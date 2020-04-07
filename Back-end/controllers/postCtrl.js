const conn = require("../connectionToDatabase") ; 

exports.simplePost = (req , res , next) => {

    const data = JSON.parse(req.body.post) ; 
    const filename = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` ; 

    const createPost = function (data , file , callback , respond) {

        const post = {
            creator: data.id_user , 
            title: data.title , 
            description: data.description , 
            image: file
        }
        conn.query("INSERT INTO post (creator , title , description , image) VALUES (? , ? , ? , ?)" , [post.creator , post.title , post.description , post.image] , (error) => {

            if (error) {
                callback(false , respond) ; 
            } else {
                callback(true , respond) ; 
            }
        })
    }

    const respondTheClient = function (access , respond) {
        if (access) {
            respond.status(201).json({
                message: "Your post created" , 
            }) ;
        } else {
            respond.status(400).json({
                message: "Error" , 
            }) ;
        }
    }

    createPost(data , filename , respondTheClient , res) ; 
}

exports.getAllPost = (req , res , next) => {

    const getAllPost = function(callback , respond){

        conn.query("SELECT user.name , user.surname , user.photo AS avatarCreator , post.* FROM user INNER JOIN post ON post.creator = user.id_user ORDER BY post.id DESC" , (error , rows) => {

            if (error) {
                callback(false , respond) ; 
            } else {
                callback(true , respond , rows) ; 
            }
        }) ; 
    }

    const sendPost = function(access , respond , data) {

        if (access) {
            respond.status(200).json({
                allPost: data , 
                success: true
            })
        } else {
            respond.status(400).json({
                message: "Error" , 
                success: false
            }) ;
        }
    }

    getAllPost(sendPost , res) ; 
}