import React from "react" ; 
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import LogIn from "./LogIn" ; 
import SignUp from "./SignUp" ; 
import MainPage from "./MainPage" ; 
import CreatePost from "./CreatePost" ; 
import ReadPost from "./ReadPost";
import GeneralContext from "../GeneralContext";
import MessageComponent from "./Message";

export default class App extends React.Component{

    static verifyConnect(context) {
      const value = context.id_user  ; 
      const secondValue = window.sessionStorage.getItem("id_user") ; 
  
      if (typeof(value) === "string") 
      {
          return{
              id_user: value,
              redirect: false
          }
      } else if ( typeof(secondValue) === "string") {
          return{
              id_user: secondValue,
              redirect: false
          }
      } else {
          return{
            redirect: true
          }
      }
  }

    state = {
      id_user: null , 
      setIdUser: params => this.setState({ id_user: params })
    }

    render(){
      return (
        <Router>
          <GeneralContext.Provider value={this.state}>
            <div>
              <Switch>
                <Route exact path={"/"} component={LogIn}></Route>
                <Route path={"/signup/"} component={SignUp}></Route>
                <Route path={"/mainpage"} component={MainPage}></Route>
                <Route path={"/createapost"} component={CreatePost}></Route>
                <Route path={"/readpost/:post"} component={ReadPost}></Route>
                <Route path={"/message"} component={MessageComponent}></Route>
              </Switch>
            </div>
          </GeneralContext.Provider>  
        </Router>
    );}
}

App.contextType = GeneralContext ; 
