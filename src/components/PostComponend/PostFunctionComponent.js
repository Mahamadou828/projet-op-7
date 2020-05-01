import React from "react" ; 
import socketIoClient from "socket.io-client" ; 
import { GET_APPRECIATION, BASE_ROUTE } from "../../RequestRoute";


export default class PostFunctionComponent extends React.Component {

    constructor (props)
    {
        super(props) ; 
    }

    getAppreciationOfAnPost = () => {
        const url=`${GET_APPRECIATION}${this.state.id_user}/${this.state.id_post}` ; 

        const myInit = {
            method: "GET" , 
            mode: "cors" , 
            cache: "default"
        } ; 

        fetch(url , myInit)
        .then((respond) => {
            respond.json()
            .then((data) => {
                this.setState({
                    like: data.like === 1 ? true : false , 
                    dislike: data.dislike === 1 ? true : false 
                })
            })
        })

    }

    InitSocket = () => {
        this.socket = socketIoClient(BASE_ROUTE) ; 

        this.socket.on("updateAppreciation" , (dataJson) => {
            const data = JSON.parse(dataJson) ; 

            if(data.id_post === this.state.id_post)
            {
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
            dislike: !this.state.like && this.state.dislike ? false : this.state.dislike
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
            like: !this.state.dislike && this.state.like ? false : this.state.like
        })
    }

    onShare =  () => {

    }

}
