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

exports.registerFile = (req , res , next) => { 
    if(typeof (req.body.oldFiles) !== "undefined")
    {

    } else {
        res.status(201).json({ 
            filename: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` ,
        })
    }
}

exports.savePost = (req , res , next) => {
    const data = req.body ; 

    const registerPost = function (data , callback , respond) {

        conn.query("INSERT INTO post (creator , title , description , image , content) VALUES (? , ? , ? , ? , ?)" , [data.creator , data.title , data.description , data.file , data.content] , (error) => {
            if(error) {
                callback(false , respond)
            } else {
                console.log(respond) ;
                callback(true , respond) ; 
            }
        }) ; 
    }

    const respondTheClient = function (access , respond) {
        console.log(respond) ;
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

    console.log(req.param.id) ;

    // const data = req.body ; 

    // const getPost = function (data , callback , respond) {

    //     console.log(data) ;

    //     conn.query("SELECT post.* , user.name AS creatorName , user.surname as creatorSurname , user.photo as creatorAvatar FROM post INNER JOIN user ON post.creator = user.id_user WHERE post.id =? " , [data.id_post] , (error , rows) => {
    //         if(error) {
    //             callback(false , respond) ; 
    //         } else {
    //             console.log(rows)
    //             callback(true , respond , rows[0]) ; 
    //         }
    //     })
    // }

    // const sendResponse = function (access , respond , data=null) {
    //     if (access) {
    //         respond.status(200).json({data:data , success:true}) ; 
    //     } else {
    //         respond.status(400).json({data:null , success:false})
    //     }
    // }

    // getPost(data , sendResponse , res) ; 
}