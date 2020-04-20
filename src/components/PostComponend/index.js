import React from "react" ; 
import Post from "./Post" ; 
import PropsType from "prop-types" ; 
import {Redirect} from "react-router-dom" ; 
import "./style/style.scss" ; 
import PostFunctionComponent from "./PostFunctionComponent";

export default class PostComponend extends PostFunctionComponent {

    constructor (props)
    {
        super(props) ; 
    }

    state = {
        id_post: this.props.post.id , 
        id_user: this.props.id_user , 
        like: false , 
        dislike: false , 
        read: false , 
        numLike: this.props.post._like , 
        numDislike: this.props.post.dislike , 
        numShare: this.props.post.share
    }

    componentDidMount() {
        this.InitSocket() ; 
    }

    onComment = () => {
        
    }

    onRead = () => {
        this.setState({
            read: true
        })
    }

    render() {

        return(
            <section className="post">
                <Post 
                    name={this.props.post.name}
                    surname={this.props.post.surname}
                    description={this.props.post.description}
                    avatar={this.props.post.avatarCreator}
                    title={this.props.post.title}
                    image={this.props.post.image}
                    content={this.props.post.content}
                    like={this.state.numLike}
                    dislike={this.state.numDislike}
                    share={this.state.numShare}
                    onComment={this.onComment}
                    onLike={this.onLike}
                    onDislike={this.onDislike}
                    onShare={this.onShare}
                    onRead={this.onRead}
                />

                {this.state.read ? <Redirect to={`/readpost/${this.state.id_post}/${this.state.id_user}`} /> : null }

            </section>

            
        ) ; 
    }
}

PostComponend.propTypes = {
    post: PropsType.object.isRequired , 
    id_user: PropsType.string.isRequired
}