const server = require("./server") ; 
const SocketRoute = require("./SocketRoute/appreciationPost") ; 
const postAppreciationCtrl = require("./SocketRoute/updateAppreciationPost") ; 

const io = require("socket.io")(server) ; 

exports.connectSocket = () => {
    io.on("connection" , (socket) => {
        
        socket.on("like" , (dataJSON) => {
            const data = JSON.parse(dataJSON) ; 
            SocketRoute.Like(data.id_user , data.id_post) 
            .then((respond) => {
                if(respond)
                    SendAppreciationPost(socket , data.id_post) ; 
            })    
        })

        socket.on("dislike" , (dataJSON) => {
            const data = JSON.parse(dataJSON) ; 
            SocketRoute.Dislike(data.id_user , data.id_post)
            .then((respond) => {
                if(respond)
                    SendAppreciationPost(socket , data.id_post) 
            })
        })

        socket.on("setNull" , (dataJSON) => {
            const data = JSON.parse(dataJSON) ; 

            SocketRoute.resetAppreciation(data.id_user , data.id_post)
            .then((respond) => {

                if(respond)
                    SendAppreciationPost(socket , data.id_post) ;        
            })
        })

    })
}

function SendAppreciationPost (socket , id_post) {
    const obj={
        like: 0 , 
        dislike: 0 , 
        share: 0 , 
        id_post: id_post
    }

    postAppreciationCtrl.getAppreciationPost(obj)
    .then((data) => {
        postAppreciationCtrl.updatePostAppreciation(data)
        .then((respond) => {
            socket.emit("updateAppreciation" , JSON.stringify(respond)) ;
        })
    })
}