// Set up your application entry point here...
 import React from "react" ; 
 import {AppContainer} from "react-hot-loader" ; 
 import ReactDom from "react-dom" ; 
 import App from "./components/App" ; 

ReactDom.render(
    <AppContainer>
        <App />
    </AppContainer> , 
    document.getElementById("app")
) ; 
