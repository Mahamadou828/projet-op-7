import React from "react" ;
import Header from "../Header" ; 
import PostComponend from "../PostComponend" ; 
import VerifyInput from "../../function/verifyInput" ; 

export default class MainPage extends React.Component {

    onRefreshPost() {

        const url = "http://localhost:3030/post/getallpost" ; 

        const myInit = {
            method: "POST" , 
            mode: "cors" , 
            cache: "default"
        }

        fetch(url , myInit) 
        .then ((respond) => {
            respond.json()
            .then((data) => {
                console.log(data.allPost) ; 
                return data.allPost ; 
            })
            .catch((error) => {})
        })
        .catch((error) => {})

    }

    constructor(props) {
        super(props) ; 
    }

    state = {
        id_user: this.props.match.params.id , 
        verificationForPostInput: false ,
        errorForPostInput: " " , 
        createPost: false , 
        redirect: false , 
        submit: false , 
        code: 0
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
            let url = null ; 

            const typePost = document.querySelector("#createAnSimplePost").checked ; 

            this.setState({
                submit: true
            }) ; 

            if (typePost) {

                url = "http://localhost:3030/post/simplepost" ; 
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
                        console.log(data) ; 
                    })
                })

            }

        }

    }

    onFilterMode = (code) => {

        this.setState({
            code: code , 
        })
    }

    render() {

        this.content = [] ; 

        switch (this.state.code) 
        {
            case 0: {
                this.content = this.onRefreshPost() ; 
                break ; 
            }
        }

        console.log(this.content) ; 
        return(
            <div className="mainpage">
                <Header 
                verifyInput = {this.onVerifyInput}
                createAnNewPost = {this.onCreateAnNewPost}
                />
                {
                    this.content.map( post => (
                        <PostComponend 
                            post={post}
                        />
                    ))
                }
            </div>
        ) ;
    }
}