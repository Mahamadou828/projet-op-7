import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';

function UserDescription({ UserInfo, access }) {
  const renderSkeleton = () => {
    return (
      <article>
        <Skeleton variant="text" />
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="rect" width={210} height={118} />
      </article>
    );
  };

  const renderUserInfo = () => {
    return (
      <article className="load">
        <img className="bg" src="../../image/banner-small.jpg" />
        <img src={UserInfo.photo} alt="user picture" className="picture" />
        <h4>
          {UserInfo.name} {UserInfo.surname}
        </h4>
        <p>{UserInfo.description}</p>
      </article>
    );
  };

  return (
    <section className="ephemeral-tablette">
      {access && UserInfo !== null ? renderUserInfo() : renderSkeleton()}
    </section>
  );
}
const mapStateToProps = (state) => ({
  UserInfo: state.Access.accessData.userInfo,
  access: state.Access.access,
});

UserDescription.propTypes = {
  UserInfo: PropTypes.object,
  access: PropTypes.bool,
};
export default connect(mapStateToProps, null)(UserDescription);
