import React from "react" ; 
import Header from "./Header" ; 
import Markdown from "./Markdown" ; 
import markdown from "markdown-it" ; 
import PanelPost from "./PanelPost" ; 
import Snackbar from "./SnackBar" ; 
import Backdrop from "./BackDrop" ; 
import VerifyInput from "../../function/verifyInput" ; 
import "./style/style.scss" ; 


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
        this.text = "" ; 

        console.log(this.parameter) ;

        // localStorage.clear() ;   
    }

    state = {
        submit: false , 
        verification: false , 
        redirect: false , 
        showPanel: false
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
            formData.append("oldFiles" , this.parameter.file) ;

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
            file: this.parameter.file , 
            content: this.text
        } ; 

        const myInit = {
            method: "POST" , 
            body: JSON.stringify(obj), 
            mode: "cors" , 
            cache: "default"
        }

        const url = "http://localhost:3030/post/savepost" ; 

        fetch(url , myInit)
        .then((respond) => {
            respond.json()
            .then((data) => {
                if(data.success) 
                {
                    this.setState({
                        showPanel: true
                    })
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

        console.log(result) ; 

        const content = document.querySelector(".markdown-write-result") ;

        content.innerHTML = result ; 

        this.text = event.target.value ; 

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
                file={this.parameter.filename.filename}
                change={this.onChange}
                />
                {this.state.submit ? null : null}
                {this.state.redirect ? null : null}
                {this.state.showPanel ? null : null}
            </section>
        ) ;
    }
}