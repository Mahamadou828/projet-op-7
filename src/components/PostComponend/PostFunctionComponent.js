import React from "react" ; 
import socketIoClient from "socket.io-client" ; 


export default class PostFunctionComponent extends React.Component {

    constructor (props)
    {
        super(props) ; 
    }

    InitSocket = () => {
        this.socket = socketIoClient("http://localhost:3030/") ; 

        this.socket.on("updateAppreciation" , (dataJson) => {
            const data = JSON.parse(dataJson) ; 

            if(data.id_post === this.state.id_post)
            {

                console.log(data) ;
                this.setState({
                    numLike: data.like , 
                    numDislike: data.dislike , 
                    numShare: data.share
                })
            }
        })
    }

    onLike = () => {
        if(!this.state.like)
        {
            this.socket.emit("like" , JSON.stringify({id_user: this.state.id_user , id_post: this.state.id_post})) ; 
        } else {
            this.socket.emit("setNull" , JSON.stringify({id_user: this.state.id_user , id_post: this.state.id_post})) ; 
        }

        this.setState({
            like: !this.state.like , 
        })
    }

    onDislike = () => {
        if(!this.state.dislike)
        {
            this.socket.emit("dislike" , JSON.stringify({id_user: this.state.id_user , id_post: this.state.id_post})) ;
        } else {
            this.socket.emit("setNull" , JSON.stringify({id_user: this.state.id_user , id_post: this.state.id_post})) ;
        }

        this.setState({
            dislike: !this.state.dislike , 
        })
    }

    onShare =  () => {

    }

}
