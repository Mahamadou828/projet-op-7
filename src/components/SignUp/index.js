import React from "react" ; 
import TextField from "@material-ui/core/TextField" ; 
import Button from "@material-ui/core/Button" ; 
import {Link} from "react-router-dom" ; 
import "./style/style.scss" ; 
import LinearProgress from "@material-ui/core/LinearProgress" ; 
import VerifyInput from "../../function/verifyInput" ; 
import {Redirect} from "react-router-dom" ; 

export default class SignUp extends React.Component {

    state = {
        submit: false , 
        verification: false , 
        error: " " , 
        redirect: false , 
        id: "" , 
    }

    onSubmitForm = () => {

        const file = document.querySelector("#picture").files[0] ; 
            
        if(this.state.verification && (typeof(file) !== "undefined"))
        {
            const url = "http://localhost:3030/user/signup" ; 

            const formData = new FormData() ; 

            const user = {
                name: document.querySelector("#name").value , 
                surname: document.querySelector("#surname").value ,   
                email: document.querySelector("#email").value , 
                password: document.querySelector("#password").value , 
                description: document.querySelector("#description").value , 
            }

            formData.append("user" , JSON.stringify(user)) ; 
            formData.append("images" , document.querySelector("#picture").files[0]) ;

            const myInit = {
                method: "POST" , 
                body: formData, 
                mode: "cors" , 
                cache: "default"
            }

            this.setState({
                submit: true
            })

            fetch(url , myInit)
            .then((respond) => {
                respond.json()
                .then((data) => {
                    if (data.createUser) {
                        this.setState ({
                            id: data.id_user , 
                            redirect: true
                        })
                    } else {
                        this.setState({
                            submit: false , 
                            error: data.message
                        })
                    }

                    console.log(data) ;
                })  
                .catch((error) => {console.log(error)}) ; 
            })
            .catch((error) => {console.log(error)}) ; 
        } else {
            this.setState({
                error: "You enter false information or you forget to add a image file"
            })
        }
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
            verification: VerifyInput(value , code).result , 
            error: VerifyInput(value , code).error
        }) ; 
    }

    render() {

        return(
            <div className="signup form-user">

                <img src="../image/background-form.jpg" alt="..." className="form-user-img"/>

                <section className="form-user-decoration">
                    <i className="fas fa-globe"></i>
                    <h1>GROUPEMANIA</h1>
                    <article className="form-user-decoration-info">
                        <p>Have a accout log here</p>
                        <Link to="/">LogIn</Link>
                    </article>
                </section>

                <form className="signup-form">
                    <TextField
                        label="Enter your name"
                        required
                        id="name"
                        name="name"
                        onChange={() => this.onVerifyInput(1 , "name")} 
                    /> 
                    <TextField 
                        label="Enter your surname"
                        required 
                        id="surname"
                        name="surname"
                        onChange={() => this.onVerifyInput(1 , "surname")}
                    />
                    <TextField 
                        label="Enter your email"
                        required
                        id="email"
                        name="email"
                        onChange={() => this.onVerifyInput(2 , "email")}
                    />
                    <TextField 
                        label="Enter your password"
                        required
                        id="password"
                        name="password"
                    />
                    <TextField 
                        label="Enter a short description of you"
                        id="description"
                        name="description"
                        multiline
                        rows="10"
                        col="10"
                        onChange={() => this.onVerifyInput(4 , "description")}
                    />
                    <input 
                        type="file" 
                        name="images"
                        placeholder="Choose One photo" 
                        id="picture" 
                        accept="image/png, image/jpeg" 
                        onChange={() => this.onVerifyInput(3 , "picture")} 
                        required
                    />

                    <Button onClick={() => this.onSubmitForm()}>Submit</Button>
                    {this.state.submit ? <div><LinearProgress color="secondary" /> <LinearProgress color="secondary" /></div> : null}
                    <p>{this.state.error}</p>
                </form>
                {this.state.redirect ? <Redirect to={`/mainpage/${this.state.id}`} /> : null}
            </div>
        ) ; 

    }
}