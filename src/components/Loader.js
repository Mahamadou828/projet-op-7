import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Loader(props) {
  const { submissionIsInProgress, loaderNumber } = props;
  if (submissionIsInProgress) {
    switch (loaderNumber) {
      case 2:
        return (
          <div className="container">
            <div className="spinner spinner-one"></div>
            <div className="spinner spinner-two"></div>
            <div className="spinner spinner-three"></div>
            <div className="spinner spinner-four"></div>
          </div>
        );
      case 3:
        return (
          <div className="wrap">
            <div className="loading">
              <div className="bounceball"></div>
              <div className="text">NOW LOADING</div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="preloaders">
            <div className="loader-wrapper loader-wrapper--1">
              <div className="loader loader--1">
                <div className="circle-line"></div>
                <div className="circle-line"></div>
                <div className="circle-line"></div>
                <div className="circle-line"></div>
                <div className="circle-line"></div>
                <div className="circle-line"></div>
              </div>
            </div>
          </div>
        );
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
