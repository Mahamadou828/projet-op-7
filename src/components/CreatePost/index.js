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

        this.parameter = JSON.parse(localStorage.getItem("postData")) ; 
        this.markdowText = "" ;
        this.panel = null ; 

        console.log("les parametre" , this.parameter) ;

        // localStorage.clear() ;   
    }

    state = {
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
        const file= document.querySelector("#picture").file[0] ; 

        const verify = (VerifyInput(title , 4).result && VerifyInput(description , 4).result && VerifyInput(file , 3).result) ; 

        if(verify) 
        {
            this.parameter.title = title ; 
            this.parameter.description = description ; 
            this.parameter.change = true ;
        }

        if(typeof(file) !== "undefined")
        {
            const url = "http://localhost:3030/post/registerimageforpost" ;
            const formData = new FormData() ;   

            formData.append("images" , file) ; 
            formData.append("oldFiles" , this.parameter.filename) ;

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
            creator: this.parameter.id_user , 
            title: this.parameter.title , 
            description: this.parameter.description , 
            file: this.parameter.filename , 
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

        const url = "http://localhost:3030/post/savepost" ; 

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

    onReset = () => {

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
                reset={this.onReset}
                /> 
                <Markdown 
                write={this.onWrite}
                />
                <PanelPost
                className="markdown-panel-config"
                title={this.parameter.title}
                description={this.parameter.description}
                file={this.parameter.filename}
                change={this.onChange}
                />
                {this.state.submit ? <Backdrop /> : null}
                {this.state.redirect ? <Redirect to={`/mainpage/${this.parameter.creator}`} /> : null}
                {this.state.showPanel ? this.panel: null}
            </section>
        ) ;
    }
}