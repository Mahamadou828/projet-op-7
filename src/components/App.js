import React from "react" ; 
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import LogIn from "./LogIn" ; 
import SignUp from "./SignUp" ; 
import MainPage from "./MainPage" ; 

export default function App() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path={"/"} component={LogIn}></Route>
            <Route path={"/signup/"} component={SignUp}></Route>
            <Route path={"/mainpage/:id"} component={MainPage}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
