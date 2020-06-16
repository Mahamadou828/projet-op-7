import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Loader(props) {
  const { submissionIsInProgress, loaderNumber } = props;
  if (submissionIsInProgress) {
    switch (loaderNumber) {
      case 1:
        return (
          <div className="centered">
            <div className="blob-1"></div>
            <div className="blob-2"></div>
          </div>
        );
        break;
      case 2:
        return (
          <div className="container">
            <div className="spinner spinner-one"></div>
            <div className="spinner spinner-two"></div>
            <div className="spinner spinner-three"></div>
            <div className="spinner spinner-four"></div>
          </div>
        );
        break;
      case 3:
        return (
          <div className="wrap">
            <div className="loading">
              <div className="bounceball"></div>
              <div className="text">NOW LOADING</div>
            </div>
          </div>
        );
        break;
    }
  } else {
    return null;
  }
}

Loader.propTypes = {
  submissionIsInProgress: PropTypes.bool,
  loaderNumber: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    submissionIsInProgress: state.Loading.statusLoad,
    loaderNumber: state.Loading.number,
  };
};

export default connect(mapStateToProps, null)(Loader);
