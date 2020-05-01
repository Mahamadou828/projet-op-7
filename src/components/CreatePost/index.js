import React from "react" ; 
import Header from "./Header" ; 
import Markdown from "./Markdown" ; 
import markdown from "markdown-it" ; 
import PanelPost from "./PanelPost" ; 
import Backdrop from "./Backdrop" ; 
import Snackbar from "./Snackbar" ;  
import VerifyInput from "../../function/verifyInput" ; 
import "./style/style.scss" ; 
import { Redirect } from "react-router-dom";
import { UPDATE_IMAGE, SAVE_POST } from "../../RequestRoute";

export default class CreatePost extends React.Component {

    constructor(props) {
        super(props) ; 
        this.mark = new markdown({
            html:         true,    
            xhtmlOut:     true,                             
            breaks:       true,        
            langPrefix:   'language-',                                 
            linkify:      true,        
            typographer:  true,
        }) ; 
        this.markdowText = "" ;
        this.panel = null ; 

        // localStorage.clear() ;   
    }

    state = {
        id_user: JSON.parse(localStorage.getItem("postData")).id_user ,
        title: JSON.parse(localStorage.getItem("postData")).title , 
        description: JSON.parse(localStorage.getItem("postData")).description , 
        filename: JSON.parse(localStorage.getItem("postData")).filename , 
        submit: false , 
        verification: false , 
        redirect: false , 
        showPanel: false
    }

    onClosePanel = () => {
        this.setState({
            showPanel:false
        })
    }

    onChange= () => {
        const title = document.querySelector("#title").value ; 
        const description = document.querySelector("#description").value ;
        const file= document.querySelector("#picture").files[0] ; 

        const verify = (VerifyInput(title , 4).result && VerifyInput(description , 4).result && VerifyInput(file , 3).result) ; 

        if(verify) 
        {
            this.setState({
                title: title , 
                description: description , 
            })
        }

        if(typeof(file) !== "undefined")
        {
            const url = UPDATE_IMAGE ;
            const formData = new FormData() ;   

            formData.append("images" , file) ; 
            formData.append("oldFiles" , this.state.filename) ;

            const myInit = {
                method: "POST" , 
                body: formData, 
                mode: "cors" , 
                cache: "default" 
            }
            fetch(url , myInit)
            .then((respond) => {
                respond.json()
                .then((data) => {
                    console.log(data) ; 
                    if(!data.success) {
                        this.setState({
                            filename: data.filename
                        })
                    }
                })
                .catch((error) => {

                })
            })
            .catch((error) => {
                
            })
        }
    }

    onSavePost = () => {
        this.setState({
            submit: true
        })

        const obj = {
            creator: this.state.id_user , 
            title: this.state.title , 
            description: this.state.description , 
            file: this.state.filename , 
            content: this.markdowText
        } ; 

        const myInit = {
            method: "POST" , 
            body: JSON.stringify(obj),
            headers: {
                "Content-Type":"application/json"
            } ,  
            mode: "cors" , 
            cache: "default"
        }

        const url = SAVE_POST ; 

        this.setState({
            submit: true
        })
        fetch(url , myInit)
        .then((respond) => {
            respond.json()
            .then((data) => {
                if(data.success) 
                {
                    this.panel = <Snackbar 
                                    text="Your post created" 
                                    close={this.onClosePanel} 
                                    addButton={true}
                                    func={this.onRedirect}
                                    textButton="Redirect to main page"
                                /> ; 
                    this.setState({
                        showPanel: true , 
                        submit: false
                    }) ; 
                }
            })
        })

    }

    onRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    onWrite = (event) => {
        const result = this.mark.render(event.target.value) ; 
        const content = document.querySelector(".markdown-write-result") ;
        content.innerHTML = result ; 
        this.markdowText = event.target.value ; 
    }

    render() {
        return(
            <section className="markdown">
                <Header 
                save={this.onSavePost}
                /> 
                <Markdown 
                write={this.onWrite}
                />
                <PanelPost
                className="markdown-panel-config"
                title={this.state.title}
                description={this.state.description}
                file={this.state.filename}
                change={this.onChange}
                />
                {this.state.submit ? <Backdrop /> : null}
                {this.state.redirect ? <Redirect to={`/mainpage/${this.state.id_user}`} /> : null}
                {this.state.showPanel ? this.panel: null}
            </section>
        ) ;
    }
}