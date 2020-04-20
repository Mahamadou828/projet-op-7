const conn = require("../connectionToDatabase") ; 

exports.Like = (id_user , id_post) => {
    return new Promise((resolve , reject) => {
        
        conn.query("SELECT * FROM user_post_relation WHERE id_user=? AND id_article=?" , [id_user , id_post] , (error , rows) => {

            if(typeof(rows[0]) === "undefined")
            {
                conn.query("INSERT INTO user_post_relation (id_user , id_article , _like) VALUES (? , ? , ?)" , [id_user , id_post , true] , (error) => {
                    if(error) {
                        reject(error) ; 
                    }
                    resolve(true)
                })
            } else {
                conn.query("UPDATE user_post_relation SET _like=1, dislike=0 WHERE id_article=? AND id_user=?" , [id_post , id_user] , (error) => {
                    if(error) {
                        reject(error) ; 
                    }
                    resolve(true)
                })
            }
        })
    })
}

exports.Dislike = (id_user , id_post) => {
    return new Promise((resolve , reject) => {

        conn.query("SELECT * FROM user_post_relation WHERE id_user=? AND id_article=?" , [id_user , id_post] , (error , rows) => {

            if(typeof(rows[0]) === "undefined")
            {
                conn.query("INSERT INTO user_post_relation (id_user , id_article , dislike) VALUES (? , ? , ?)" , [id_user , id_post , true] , (error) => {
                    if(error) {
                        reject(error) ; 
                    }
                    resolve(true)
                })
            } else {
                conn.query("UPDATE user_post_relation SET dislike=1, _like=0 WHERE id_article=? AND id_user=?" , [id_post , id_user] , (error) => {
                    if(error) {
                        reject(error) ; 
                    }
                    resolve(true)
                })
            }
        })

    })
}

exports.resetAppreciation = (id_user , id_post) => {
    return new Promise((resolve , reject) => {
        
        conn.query("SELECT * FROM user_post_relation WHERE id_user=? AND id_article=?" , [id_user , id_post] , (error , rows) => {  

            if(typeof(rows[0]) !== "undefined")
            {
                conn.query("UPDATE user_post_relation SET _like=0, dislike=0 WHERE id_article=? AND id_user=?" , [id_post , id_user] , (error) => {
                    if(error) {
                        reject(error) ; 
                    }

                    resolve(true)
                })
            } else {
                reject("An server error") ;
            }
        })
        
    })
}

