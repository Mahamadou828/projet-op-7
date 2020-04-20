const conn = require("../connectionToDatabase") ;

exports.getAppreciationPost = (obj) => {
    return new Promise((resolve , reject) => {

        conn.query("SELECT COUNT(_like) as numLike FROM user_post_relation WHERE _like=true AND id_article=?" , [obj.id_post] , (error , rows) => {
            obj.like = rows[0].numLike ; 

            if(error) {
                reject(error) ;
            }

            conn.query("SELECT COUNT(dislike) as numDislike FROM user_post_relation WHERE dislike=true AND id_article=?" , [obj.id_post] , (error , rows) => {
                obj.dislike = rows[0].numDislike ; 

                if(error) {
                    reject(error) ;
                }

                conn.query("SELECT COUNT(share) as numShare FROM user_post_relation WHERE id_article=?" , [obj.id_post] , (error , rows) => {
                    obj.share = rows[0].numShare ; 

                    if(error) {
                        reject(error) ;
                    }

                    resolve(obj) ;
                })
            })
        })
    })
}

exports.updatePostAppreciation = (obj) => {
    return new Promise((resolve , reject) => {
        conn.query("UPDATE post SET _like = ?, dislike = ? , share = ? WHERE id = ?" , [obj.like , obj.dislike , obj.share , obj.id_post] , (error) => {
            if(error) {
                reject(error) ;
            } else {
                resolve(obj) ;
            }     
        })
    })
}