import React from "react" ; 
import TextField from  "@material-ui/core/TextField" ; 
import Button from "@material-ui/core/Button" ;
import CircularProgress from '@material-ui/core/CircularProgress';
import "./style/style.scss" ; 
import {Link} from "react-router-dom" ; 
import VerifyInput from "../../function/verifyInput" ; 
import {Redirect} from "react-router-dom" ; 

export default class LogIn extends React.Component {

    state = {
        verification: false ,
        error: " " , 
        submit: false , 
        id: " " , 
        redirect: false
    }

    onConnect = () => {

        if (this.state.verification) {
            const url = "http://localhost:3030/user/login" ; 

            const data = {
                email: document.querySelector("#email").value , 
                password: document.querySelector("#password").value
            }

            const myinit = {
                method: "POST" , 
                body: JSON.stringify(data) , 
                headers: {
                    "Content-Type":"application/json"
                } , 
                mode: "cors" , 
                cache: "default"
            } ; 

            this.setState({
                submit: true
            })

            fetch(url , myinit)
            .then((respond) => {
                respond.json()
                .then((data) => {
                    if (data.access) 
                    {
                        this.setState({
                            redirect: true , 
                            id: data.id_user
                        })
                    } else {
                        this.setState({
                            error: data.message , 
                            submit: false
                        })
                    }
                })
            })
        }
    } 

    onVerifyInput = (event) => {
        const value = event.target.value ; 

        this.setState({
            verification: VerifyInput(value , 2).result , 
            error: VerifyInput(value , 2).error 
        })
    }

    render() {
        return (
            <div className="login form-user">

                <img src="../image/background-form.jpg" alt="..." className="form-user-img"/>   

                <section className="form-user-decoration">
                    <i className="fas fa-globe"></i>
                    <h1>GROUPEMANIA</h1>
                    <article className="form-user-decoration-info">
                        <p>No account, you can create one with this link</p>
                        <Link to="/signup">Create account</Link>
                    </article>
                </section>
                <form className="login-form">
                    <TextField id="email" label="Enter your email" onChange = {this.onVerifyInput}/>
                    <TextField id="password" label="Enter your password" />
                    <Button variant="contained" onClick={() => {this.onConnect()}}>
                        {this.state.submit ? <CircularProgress color="secondary" />: null}
                        Connect</Button>
                    <p>{this.state.error}</p>
                </form>

                {this.state.redirect ? <Redirect to={`/mainpage/${this.state.id}`} /> : null}
            </div>
        ) ; 
    } 
}
