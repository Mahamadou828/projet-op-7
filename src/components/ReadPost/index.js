import React from 'react';
import PropsType from "prop-types" ; 
import {Redirect} from "react-router-dom" ; 
import "./style/style.scss" ; 
import PostFunctionComponent from '../PostComponend/PostFunctionComponent';

export default class ReadPost extends PostFunctionComponent {
    constructor(props) {
        super(props);

        console.log(this.props.match.params)
    }

    state = {
        id_user: this.props.match.params.id_user , 
        id_post: this.props.match.params.id_post , 
        like: false ,
        dislike: false ,
        numLike: 0 ,
        numDislike: 0 ,
        numShare: 0 ,
    }

    componentDidMount() {
        this.InitSocket() ; 
        
        const url = `http://localhost:3030/post/getonepost/${this.state.id_post}` ; 

        const myInit = {
            method: "GET" , 
            mode: "cors" , 
            cache: "default"
        }

        fetch(url , myInit)
        .then((dataJSON) => {
            dataJSON.json()
            .then((data) => {
                console.log(data) ; 
            })
        })
    }


    render() {
        return (
            <div>Je lis</div>
        )
    }
}

ReadPost.propTypes = {
    match: PropsType.object.isRequired
}