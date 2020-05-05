import React from 'react';
import PropsType from "prop-types" ; 
import {Redirect} from "react-router-dom" ; 
import Divider from '@material-ui/core/Divider';
import "./style/style.scss" ; 
import PostFunctionComponent from '../PostComponend/PostFunctionComponent';
import markdown from "markdown-it" ; 
import NavBar from './NavBar';
import { GET_ONE_POST } from '../../RequestRoute';
import Comment from '../PostComponend/Comment';
import GeneralContext from '../../GeneralContext';

export default class ReadPost extends PostFunctionComponent {
    constructor(props) {
        super(props);

        this.mark = new markdown({
            html:         true,    
            xhtmlOut:     true,                             
            breaks:       true,        
            langPrefix:   'language-',                                 
            linkify:      true,        
            typographer:  true,
        }) ;
    }

    state = {
        id_post: this.props.match.params.post , 
        post: null , 
        like: false ,
        dislike: false ,
        numLike: 0 ,
        numDislike: 0 ,
        numShare: 0 ,
        redirect: false
    }

    componentDidMount() {
        this.setState({
            id_user: this.context.id_user , 
            redirect: typeof(this.context.id_user) === "string" ? false : true , 
            path: typeof(this.context.id_user) === "string" ? " " : "/"
        })
        this.InitSocket() ; 
        this.getAppreciationOfAnPost() ;
        const url = `${GET_ONE_POST}${this.state.id_post}` ; 
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
                this.setState({
                    numDislike: data.data.dislike , 
                    numLike: data.data._like , 
                    numShare: data.data.share , 
                    post: {
                        title: data.data.title ,
                        image: data.data.image ,
                        description: data.data.description ,
                        content: data.data.content ,
                    }
                })
            })
        })
    }

    onRedirect = () => {
        clearTimeout(this.timer) ; 
        this.setState({
            redirect: true , 
            path: "/mainpage"
        })
    }


    render() {

        if (this.state.post !== null)
        {
            const {title , image , description} = this.state.post ; 
            const {numLike , numDislike , numShare} = this.state ;

            this.timer = setTimeout(() => {
                document.querySelector(".read-content").innerHTML = this.mark.render(this.state.post.content) ; 
            } , 3000) ; 

            return (
                <section className="read-background">

                    <nav className="read-nav">
                        <NavBar 
                            numDislike={numDislike}
                            numLike={numLike}
                            numShare={numShare}
                            onShare={this.onShare}
                            onRedirect={this.onRedirect}
                            onLike={this.onLike}
                            onDislike={this.onDislike}
                            stateLike={this.state.like}
                            stateDislike={this.state.dislike}
                        />
                    </nav>

                    <section className="read">
                        <article className="read-description">
                            <header><h2>{title}</h2></header>
                            <img src={image} alt="..." /> 
                            <p>{description}</p>
                        </article>
                        <Divider />
                        <article className="read-content">
                            
                        </article>

                        <Divider />
                    </section>

                    <Comment 
                        id_user={this.state.id_user}
                        id_post={parseInt(this.state.id_post)}
                    />

                    {this.state.redirect ? <Redirect to={this.state.path} /> : null}
                    
                </section>
            )
        } else {
            return null ;
        }
    }
}

ReadPost.contextType = GeneralContext ;

ReadPost.propTypes = {
    match: PropsType.object.isRequired
}