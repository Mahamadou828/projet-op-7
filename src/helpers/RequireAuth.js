import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccessAction from '../actions/AccessAction';
import PropTypes from 'prop-types';
import socketIoClient from 'socket.io-client';
import { BASE_ROUTE } from '..';

export default function (Component) {
  class RequireAuth extends React.Component {
    constructor(props) {
      super(props);
      this.socket = null;
    }
    componentDidMount() {
      if (!this.props.access) {
        this.props.history.push('/');
      } else {
        this.socket = socketIoClient(BASE_ROUTE);
      }
    }

    render() {
      return <Component {...this.props} socket={this.socket} />;
    }
  }

  const mapStateToProps = (state) => ({
    access: state.Access.access,
  });

  const mapDispatchToProps = {
    AccessAction,
  };

  RequireAuth.propstypes = {
    access: PropTypes.bool,
    history: PropTypes.object,
  };

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(RequireAuth));
}
