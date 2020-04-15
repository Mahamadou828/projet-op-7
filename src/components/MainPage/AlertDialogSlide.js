import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PropsType from "prop-types" ; 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (access) => {
    setOpen(false);
    props.resetState() ; 

    if(access)
    {
        props.closeSlide() ; 
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.textSlide} 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Close
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            {props.buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialogSlide.propTypes = {
    resetState: PropsType.func.isRequired ,
    closeSlide: PropsType.func.isRequired , 
    title: PropsType.string.isRequired ,
    buttonText: PropsType.string.isRequired ,
    textSlide: PropsType.string.isRequired 
}