import React from "react" ; 
import Post from "./Post" ; 
import PropsType from "prop-types" ; 
import "./style/style.scss" ; 


export default class PostComponend extends React.Component {

    constructor (props)
    {
        super(props) ; 
        console.log(props.post) ; 
    }

    componentDidMount() {
        
    }

    onLike = () => {

    }

    onDislike = () => {

    }

    onShare =  () => {

    }

    onComment = () => {
        
    }

    render() {
        return(
            <Post />
        ) ; 
    }
}

PostComponend.propTypes = {
    post: PropsType.object.isRequired
}