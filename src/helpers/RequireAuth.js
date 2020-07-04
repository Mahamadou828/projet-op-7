import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccessAction from '../actions/AccessAction';
import PropTypes from 'prop-types';

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
