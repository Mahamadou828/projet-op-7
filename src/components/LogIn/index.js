import React from "react" ; 
import TextField from  "@material-ui/core/TextField" ; 
import Button from "@material-ui/core/Button" ;
import {Link} from "react-router-dom" ; 
import VerifyInput from "../../function/verifyInput" ; 
import {Redirect} from "react-router-dom" ; 
import { LOGIN } from "../../RequestRoute";
import GeneralContext from "../../GeneralContext";
import "../generalComponentStyle/form.scss" ; 
import LoadingBall from "../Loader/LoadingBall";

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
            const url = LOGIN ; 

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
                        this.context.setIdUser(data.id_user) ; 
                        window.sessionStorage.setItem("id_user" , data.id_user) ;
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
            <div className="body-form">
                <div className="form">
                    <section className="form-header">
                        <h1>GROUP<i className="logo fas fa-globe"></i>MANIA</h1>
                        <article className="form-header-link">
                            <p>No account, you can create one <Link to="/signup">Here</Link></p>
                        </article>
                    </section>
                    <form className="form-corps">
                        <TextField id="email" label="Enter your email" onChange = {this.onVerifyInput}/>
                        <TextField id="password" label="Enter your password" />
                        <Button variant="contained" onClick={() => {this.onConnect()}}>
                            Connect</Button>
                        <p>{this.state.error}</p>
                        {this.state.submit ? <LoadingBall />: null}
                    </form>

                    {this.state.redirect ? 
                    <Redirect to={`/mainpage`} /> 
                    : null}
                </div>
            </div>
            
        ) ; 
    } 
}

LogIn.contextType = GeneralContext ; 