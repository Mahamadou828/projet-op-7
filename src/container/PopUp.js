import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import LoaderAction from '../actions/LoaderAction';
import PropTypes from 'prop-types';

function PopUp({ display, LoaderAction, message }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    LoaderAction(1, false, false, '');
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={display}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              Message
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    display: state.Loading.popUp,
    message: state.Loading.message,
  };
};

const mapDispatchToProps = {
  LoaderAction,
};

PopUp.propTypes = {
  display: PropTypes.bool,
  LoaderAction: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
