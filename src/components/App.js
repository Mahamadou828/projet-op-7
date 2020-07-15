import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from '../container/Login';
import SignUp from '../container/SignUp';
import Error from '../container/Error';
import '../style/index.scss';
import RequireAuth from '../helpers/RequireAuth';
import Header from './Header';
import Home from '../container/Home';
import Message from '../container/Message';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Error />
        <Header />
        <div>
          <Switch>
            <Route exact path={'/'} component={LogIn}></Route>
            <Route path={'/signup/'} component={SignUp}></Route>
            <Route path={'/home'} component={RequireAuth(Home)}></Route>
            <Route path={'/message'} component={RequireAuth(Message)}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
