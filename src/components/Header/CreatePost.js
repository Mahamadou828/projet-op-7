import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LanguageIcon from '@material-ui/icons/Language';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from "prop-types" ; 

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreatePost(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="mainpage-nav-item">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <BorderColorIcon />
        <p className="mainpage-nav-detail">Create a post</p>
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={`${classes.appBar} mainpage-nav-createpost`}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <article className="mainpage-nav-createpost-logo">
                <LanguageIcon className="mainpage-icon" />
                <h1>Groupomania</h1>
              </article>
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <form className="mainpage-nav-createpost-form">
            <TextField required id="title" label="Required" defaultValue="Title of the post" onChange={() => props.verifyInput(4 , "title")} />
            <TextField
              id="description"
              label="Enter the description of your post this description will appear to the user"
              multiline
              rowsMax="5"
              onChange={() => props.verifyInput(4 , "description")}
            />
            <input 
              type="file" 
              name="images"
              placeholder="Choose One image" 
              id="picture" 
              accept="image/png, image/jpeg" 
              required
              onChange={() => props.verifyInput(3 , "picture")}
            />
            <section className="mainpage-nav-createpost-form-submit">
              <Button 
              variant="outlined"
              onClick ={() => props.createAnNewPost()}
              >
                Create post
              </Button>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedF"
                    indeterminate
                    id="createAnSimplePost"
                  />
                }
                label="Create a simple Post"
              />
            </section>
          </form>
        </List>
      </Dialog>
    </div>
  );
}

CreatePost.propTypes = {
  verifyInput: PropTypes.func.isRequired , 
  createAnNewPost: PropTypes.func.isRequired
}