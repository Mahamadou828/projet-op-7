import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from '../container/Login';
import SignUp from '../container/SignUp';
// import MainPage from './MainPage';
// import CreatePost from './CreatePost';
// import ReadPost from './ReadPost';
// import GeneralContext from '../GeneralContext';
// import MessageComponent from './Message';
import Error from '../container/Error';
import '../style/index.scss';
import RequireAuth from '../helpers/RequireAuth';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Error />
        <div>
          <Switch>
            <Route exact path={'/'} component={RequireAuth(LogIn)}></Route>
            <Route path={'/signup/'} component={RequireAuth(SignUp)}></Route>
            {/* <Route path={'/mainpage'} component={MainPage}></Route>
                <Route path={'/createapost'} component={CreatePost}></Route>
                <Route path={'/readpost/:post'} component={ReadPost}></Route>
                <Route path={'/message'} component={MessageComponent}></Route> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
