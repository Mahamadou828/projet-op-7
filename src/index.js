// Set up your application entry point here...
 import React from "react" ; 
 import render from "react-dom" ; 
 import {AppContainer} from "react-hot-loader" ; 
 import ReactDom from "react-dom" ; 
 import App from "./components/App" ; 

ReactDom.render(
    <AppContainer>
        <App />
    </AppContainer> , 
    document.getElementById("app")
) ; 

if (module.hot) 
{
    module.hot.accept('./components/App', () => {
        const NewRoot = require('./components/App').default;
        render(
          <AppContainer>
            <NewRoot />
          </AppContainer>,
          document.getElementById('app')
        );
      });
}