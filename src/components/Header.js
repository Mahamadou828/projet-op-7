import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ history }) {
  const localRoute = history.location.pathname;
  const pageWithEnableHeader = ['/signup', '/', '/message'];
  if (!pageWithEnableHeader.includes(localRoute)) {
    return (
      <section className="simplenav">
        <h1>
          GROUP<i className="logo fas fa-globe"></i>MANIA
        </h1>
      </section>
    );
  } else {
    return null;
  }
}

Header.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Header);
