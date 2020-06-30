import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ErrorAction from '../actions/ErrorAction';
import LoaderAction from '../actions/LoaderAction';
import PropsTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Error(props) {
  const { error, text, ErrorAction, LoaderAction } = props;

  const handleClose = () => {
    ErrorAction(false, '');
    LoaderAction(0, false);
  };

  return (
    <div>
      <Dialog
        open={error}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'An unexpected situation happened :('}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok, I understand
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.Error.error,
    text: state.Error.text,
  };
};

const mapDispatchToProps = {
  ErrorAction,
  LoaderAction,
};

Error.propTypes = {
  error: PropsTypes.bool,
  text: PropsTypes.string,
  ErrorAction: PropsTypes.func,
  LoaderAction: PropsTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
