import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccessAction from '../actions/AccessAction';

export default function (Component) {
  class RequireAuth extends React.Component {
    componentDidMount() {
      if (!this.props.access) {
        this.props.history.push('/');
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({
    access: state.Access.access,
    userInfo: state.Access.accessData.userInfo,
    jwt: state.Access.accessData.userInfo,
    loader: state.Loading.statusLoad,
  });

  const mapDispatchToProps = {
    AccessAction,
  };

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(RequireAuth));
}
