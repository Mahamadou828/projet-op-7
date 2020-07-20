import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AccessAction from '../actions/AccessAction';
import PropTypes from 'prop-types';
import socketIoClient from 'socket.io-client';
import { BASE_ROUTE } from '..';
import ErrorAction from '../actions/ErrorAction';
import Grow from '@material-ui/core/Grow';

export default function (Component) {
  class RequireAuth extends React.Component {
    state = {
      socket: null,
    };

    componentDidMount() {
      if (!this.props.access) {
        this.props.history.push('/');
      } else {
        const socket = socketIoClient(
          `${BASE_ROUTE}?token=${this.props.token}`
        );

        this.setState({
          socket: socket,
        });
      }
    }

    onConnectErrorEvent = (id) => {
      this.state.socket.on('Error', (dataJson) => {
        const { UserId, Message } = JSON.parse(dataJson);
        if (UserId === id) {
          this.props.ErrorAction(true, Message);
        }
      });
    };

    render() {
      if (!this.props.access) {
        return <Redirect to="/" />;
      } else if (this.state.socket !== null) {
        this.onConnectErrorEvent(this.props.UserId);
        return (
          <Grow in={true}>
            <Component {...this.props} socket={this.state.socket} />
          </Grow>
        );
      }
      return null;
    }
  }

  const mapStateToProps = (state) => ({
    access: state.Access.access,
    token: state.Access.accessData.jwt,
    UserId: parseInt(state.Access.accessData.userInfo.id),
  });

  const mapDispatchToProps = {
    AccessAction,
    ErrorAction,
  };

  RequireAuth.propTypes = {
    access: PropTypes.bool,
    history: PropTypes.object,
    token: PropTypes.string,
    ErrorAction: PropTypes.func,
    UserId: PropTypes.number,
  };

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(RequireAuth));
}
