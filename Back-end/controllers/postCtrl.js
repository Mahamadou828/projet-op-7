const conn = require("../connectionToDatabase") ; 

exports.createSimplePost = (req , res , next) => {

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
                message: "Your post has successfull create" , 
                success: true
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

exports.savePost = (req , res , next) => {
    const data = req.body ; 

    const registerPost = function (data , callback , respond) {

        conn.query("INSERT INTO post (creator , title , description , image , content) VALUES (? , ? , ? , ? , ?)" , [data.creator , data.title , data.description , data.file , data.content] , (error) => {
            if(error) {
                callback(false , respond)
            } else {
                
                callback(true , respond) ; 
            }
        }) ; 
    }

    const respondTheClient = function (access , respond) {
        
        if(access) {
            respond.status(200).json({
                success:true
            }) 
        } else {
            respond.status(400).json({
                success:false , 
                error: "An occurent error"
            })
        }
    }

    registerPost(data , respondTheClient , res) ; 
}

exports.getOnePost = (req , res , next) => {

    const id_post = req.params.id ; 

    const getPost = function (data , callback , respond) {
        conn.query("SELECT post.* , user.name AS creatorName , user.surname as creatorSurname , user.photo as creatorAvatar FROM post INNER JOIN user ON post.creator = user.id_user WHERE post.id =? " , [data] , (error , rows) => {
            if(error) {
                callback(false , respond) ; 
            } else {
                callback(true , respond , rows[0]) ; 
            } 
        }) 
    }

    const sendResponse = function (access , respond , data=null) {
        if (access) {
            respond.status(200).json({data:data , success:true}) ; 
        } else {
            respond.status(400).json({data:null , success:false})
        }
    }

    getPost(id_post , sendResponse , res) ; 
}

exports.getAppreciationOfAnPost = (req , res , next) => {
    const {id_post , id_user} = req.params ;

    const getFunction = function(id_user , id_post , callback , respond) {
        conn.query("SELECT _like , dislike FROM user_post_relation WHERE id_user=? AND id_article=?" , [id_user , id_post] , (error , rows) =>{
            if(error) {
                callback(false , respond) ; 
            } else {
                callback(true , respond , rows) ; 
            }
        })
    }

    const sendResponse = function(access , respond , data=null) {
        if(access && data.length >= 1) {
            respond.status(200).json({ 
                like: data[0]._like , 
                dislike: data[0].dislike
            }) ; 
        } else {
            respond.status(400).json({ 
                error:"An occurent error"
            })
        }
    }

    getFunction(id_user , id_post , sendResponse , res) ;
}

exports.getComment = (req , res , next) => {
    const {id_post} = req.params ; 

    getComment = function( id_post , callback , respond) {
        conn.query("SELECT comment.comment , comment.date , user.name , user.surname , user.photo FROM comment INNER JOIN user ON comment.id_user = user.id_user WHERE comment.id_post = ? ORDER BY comment.id DESC" , [id_post] , (error , rows) => {
            if(error) {
                callback(false , respond) ; 
            } else {
                callback(true , respond , rows) ; 
            }
        }) 
    }

    sendResponse = function(access , respond , data=null) {
        if (!access) {
            respond.status(400).json({error:"An Occurent Error" , access:false})
        } else {
            respond.status(200).json({access:true , data:data}) ; 
        }
    }

    getComment( id_post , sendResponse , res)
}

exports.sendComment = (req , res , next) => {

    const {comment , id_post , id_user} = req.body ;

    insertComment = function(comment , id_user , id_post , callback , respond) {
        conn.query("INSERT INTO comment (id_user , id_post , comment , date) VALUES (? , ? , ? , CURRENT_DATE)" , [id_user , id_post , comment] , (error) => {
            if(error) {
                callback(false , respond) ; 
            } else {
                callback(true , respond) ;
            }
        })
    }

    const sendResponse = function(access , respond) {
        if(access)
        {
            respond.status(200).json({success: true})
        } else {
            respond.status(400).json({error:"An Occurent Error" , access:false}) ;
        } 
    }

    insertComment(comment , id_user , id_post , sendResponse , res) ;  
}