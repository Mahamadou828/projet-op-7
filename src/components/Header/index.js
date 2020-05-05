import React , {PureComponent} from "react" ; 
import CreatePost from "./CreatePost" ; 
import Button from '@material-ui/core/Button';
import "./style/style.scss" ; 
import { Link, Redirect } from "react-router-dom";
import AlertDialog from "./DialogSlide";
import ramdomNumber from "../../function/ramdomNumber";
import {CREATE_SIMPLE_POST, REGISTER_IMAGE} from "../../RequestRoute";
import VerifyInput from "../../function/verifyInput";
import SimpleBackdrop from "./Backdrop" ;
import GeneralContext from "../../GeneralContext";
import App from "../App";
  
export default class Header extends PureComponent {
  constructor(props) {
    super(props) ; 
    this.alert = [] ; 
}

  state = {
    verificationForPostInput: false ,
    loadComplete: false , 
    showAlert: false , 
    submit: false , 
    error: "" , 
    code: 0 , 
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
                id_user: App.verifyConnect(this.context).id_user
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
                            <AlertDialog key={ramdomNumber()} resetState={reset} />
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
                        redirect: true , 
                        path: "/createpost"
                    }) ;
                })
                .catch((error) => {})
            })
            .catch((error) => {})

        }
    }
}

  render () {
    return (
      <nav className="navbar">
        <section>
          <Button>
            <Link to="/mainpage">HomePage</Link>
          </Button>
          <Button>
            <Link to="/message">Message</Link>
          </Button>
        </section>
        <h1>GROUP<i className="logo fas fa-globe"></i>MANIA</h1>
        <section>
          <CreatePost
          createAnNewPost={this.onCreateAnNewPost}
          verifyInput={this.onVerifyInput}
          />
          <Button>
            <Link to="/account">Account</Link>
          </Button>
        </section>

        {this.state.submit ? <SimpleBackdrop /> : null}
        {this.state.showAlert ? this.alert : null}
        {this.state.redirect ? <Redirect to={this.state.path} /> : null}
          
      </nav>
    );
  }
  
}

Header.contextType = GeneralContext ; 