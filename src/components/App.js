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


export default function App() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path={"/"} component={LogIn}></Route>
            <Route path={"/signup/"} component={SignUp}></Route>
            <Route path={"/mainpage/:id"} component={MainPage}></Route>
            <Route path={"/createapost"} component={CreatePost}></Route>
            <Route path={"/readpost/:post/:id_user"} component={ReadPost}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
