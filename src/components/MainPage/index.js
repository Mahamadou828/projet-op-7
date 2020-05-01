import React from "react" ;
import Header from "../Header" ; 
import PostComponend from "../PostComponend" ; 
import VerifyInput from "../../function/verifyInput" ; 
import SimpleBackdrop from "./Backdrop" ; 
import ramdomNumber from "../../function/ramdomNumber" ; 
import AlertDialogSlide from "./AlertDialogSlide" ;
import {Redirect} from "react-router-dom" ;  
import PropsType from "prop-types" ; 
import { GET_ALL_POST, CREATE_SIMPLE_POST, REGISTER_IMAGE , GET_INFORMATION_OF_AN_USER } from "../../RequestRoute";

export default class MainPage extends React.Component {

    constructor(props) {
        super(props) ; 
        this.content = [] ; 
        this.alert = [] ; 
    }

    state = {
        id_user: this.props.match.params.id , 
        verificationForPostInput: false ,
        loadComplete: false , 
        showAlert: false , 
        redirect: false , 
        submit: false , 
        error: "" , 
        code: 0
    }

    onRefreshPost = () => {
        
        const url = GET_ALL_POST ; 

        const myInit = {
            method: "POST" , 
            mode: "cors" , 
            cache: "default"
        }
        fetch(url , myInit) 
        .then ((respond) => {
            respond.json()
            .then((data) => {
                data.allPost.forEach((element) => {
                    this.content.push(
                        <PostComponend 
                            post={element}
                            key={ramdomNumber()}
                            id_user={this.state.id_user}
                        />
                )})
                this.setState({
                    loadComplete: true
                })
            })
            .catch(() => {
                this.setState({
                    error: "An occurence error"
                }) 
            })
        })
        .catch(() => {
            this.setState({
                error: "An occurence error"
            }) 
        });  
    }

    onVerifyInput = (code , inputId) => {
        let value = null ;
        if(code === 3) 
        {
            value = document.querySelector(`#${inputId}`).files[0] ; 
        } else {
            value = document.querySelector(`#${inputId}`).value ;
        }
 
        this.setState({
            verificationForPostInput: VerifyInput(value , code).result , 
            errorForPostInput: VerifyInput(value , code).error
        }) ; 
    }

    onCreateAnNewPost = () => {
        if (this.state.verificationForPostInput)
        {
            const reset = () => {
                this.setState({
                    showAlert: false
                })
            }

            let url = null ; 

            const typePost = document.querySelector("#createAnSimplePost").checked ; 

            this.setState({
                submit: true
            }) ; 

            if (typePost) {
                url = CREATE_SIMPLE_POST ; 
                const formData = new FormData() ;

                const obj = {
                    title: document.querySelector("#title").value ,
                    description: document.querySelector("#description").value , 
                    id_user: this.state.id_user
                }

                formData.append("post" , JSON.stringify(obj)) ; 
                formData.append("images" , document.querySelector("#picture").files[0]) ; 

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
                        if(data.success) {
                            this.alert.push(
                                <AlertDialogSlide
                                key={ramdomNumber()}
                                textSlide="Your post has created you can see it if you refresh the current post"
                                title={data.message}
                                closeSlide={this.onRefreshPost}
                                resetState={reset}
                                buttonText="Refresh Post"
                                />
                            ) ; 
                            this.setState({
                                submit: false , 
                                showAlert: true
                            }) ; 
                        }
                    })
                })
            } else {
                const formData = new FormData() ; 
                
                const file = document.querySelector("#picture").files[0]

                formData.append("images" , file) ; 

                const myInit = { 
                    method: "POST" , 
                    body: formData, 
                    mode: "cors" , 
                    cache: "default"
                }

                fetch(REGISTER_IMAGE , myInit)
                .then((respond) => {
                    respond.json()
                    .then((filename) => {
                        const obj = {
                            title: document.querySelector("#title").value ,
                            description: document.querySelector("#description").value , 
                            id_user: this.state.id_user , 
                            filename: filename.filename
                        }
                        localStorage.setItem("postData" , JSON.stringify(obj)) ; 
                        this.setState({
                            redirect: true
                        }) ;
                    })
                    .catch((error) => {})
                })
                .catch((error) => {})

            }
        }
    }

    onFilterMode = (code) => {
        this.setState({
            code: code , 
        })
    }

    componentDidMount() {
        this.onRefreshPost() ; 
    }

    static getInformationUser(id_user) {
        return new Promise((resolve , reject) => {
            const myInit = {
                method: "GET" , 
                mode: "cors" , 
                cache: "default"
            }
    
            fetch(`${GET_INFORMATION_OF_AN_USER}/${id_user}` , myInit)
            .then((respond) => {
                respond.json()
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                })
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    render() {
        return(
            <div className="mainpage">
                <Header 
                verifyInput = {this.onVerifyInput}
                createAnNewPost = {this.onCreateAnNewPost}
                />
                {   this.state.loadComplete ?
                    this.content : null
                }

                {this.state.submit ? <SimpleBackdrop /> : null}
                {this.state.showAlert ? this.alert : null}
                {this.state.redirect ? <Redirect to="/createapost" /> : null}
            </div>
        ) ;
    }
}

MainPage.propTypes = {
    match: PropsType.object.isRequired
}