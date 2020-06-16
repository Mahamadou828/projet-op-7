import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccessAction from '../actions/AccessAction';

export default function (Component) {
  class RequireAuth extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({
    access: state.Access.access,
    userInfo: state.Access.accessData.userInfo,
    jwt: state.Access.accessData.userInfo,
  });

  const mapDispatchToProps = {
    AccessAction,
  };

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(RequireAuth));
}
