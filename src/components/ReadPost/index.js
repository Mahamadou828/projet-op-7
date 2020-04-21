import React from 'react';
import PropsType from "prop-types" ; 
import {Redirect} from "react-router-dom" ; 
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import "./style/style.scss" ; 
import PostFunctionComponent from '../PostComponend/PostFunctionComponent';
import markdown from "markdown-it" ; 
import NavBar from './NavBar';

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
        id_user: this.props.match.params.id_user , 
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
        this.InitSocket() ; 

        console.log(this.state.id_post) ; 
        
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
                this.setState({
                    numDislike: data.data.dislike , 
                    numLike: data.data._like , 
                    numShare: data.data.share , 
                    post: {
                        title: data.data.title ,
                        image: data.data.image ,
                        description: data.data.description ,
                        content: data.data.content ,
                        creatorName: data.data.creatorName ,
                        creatorSurname: data.data.creatorSurname ,
                        creatorAvatar: data.data.creatorAvatar ,
                    }

                })
            })
        })
    }

    onRedirect = () => {
        clearTimeout(this.timer) ; 
        this.setState({
            redirect: true
        })
    }


    render() {

        if (this.state.post !== null)
        {
            const {title , image , description , creatorSurname , creatorName , creatorAvatar} = this.state.post ; 
            const {numLike , numDislike , numShare} = this.state ;

            this.timer = setTimeout(() => {
                document.querySelector(".read-content").innerHTML = this.mark.render(this.state.post.content) ; 
            } , 3000) ; 

            return (
                <section className="read">

                    <nav className="read-nav">
                        <NavBar 
                            numDislike={numDislike}
                            numLike={numLike}
                            numShare={numShare}
                            onShare={this.onShare}
                            onRedirect={this.onRedirect}
                            onLike={this.onLike}
                            onDislike={this.onDislike}
                        />
                    </nav>

                    <article className="read-description">
                        <header><h2>{title}</h2></header>
                        <img src={image} alt="..." /> 
                        <p>{description}</p>
                    </article>
                    <Divider />
                    <article className="read-content">
                        
                    </article>

                    <footer className="read-footer">
                        <h3>
                            {`${creatorName} ${creatorSurname}`} 
                        </h3>
                        <Avatar src={creatorAvatar} />
                    </footer>

                    {this.state.redirect ? <Redirect to={`/mainpage/${this.state.id_user}`} /> : null}
                    
                </section>
            )
        } else {
            return null ;
        }
    }
}

ReadPost.propTypes = {
    match: PropsType.object.isRequired
}