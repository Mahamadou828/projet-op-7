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
import LanguageIcon from '@material-ui/icons/Language';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import CreateIcon from '@material-ui/icons/Create';
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
    <div className="createpost">
      <Button onClick={handleClickOpen}>
        <p>Create a post</p>
        <CreateIcon className="navbar-logo" /> 
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={`${classes.appBar} createpost-corps`}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <article className=" createpost-logo">
                <h1>Group<LanguageIcon  />mania</h1>
              </article>
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <form className=" createpost-form">
            <TextField className="input" required id="title" label="Required" defaultValue="Title of the post" onChange={() => props.verifyInput(4 , "title")} />
            <TextField
              id="description"
              label="Enter the description of your post this description will appear to the user"
              multiline
              rowsMax="5"
              onChange={() => props.verifyInput(4 , "description")}
              className="input"
            />
            <input 
              type="file" 
              name="images"
              placeholder="Choose One image" 
              id="picture" 
              accept="image/png, image/jpeg" 
              required
              onChange={() => props.verifyInput(3 , "picture")}
              className="input"
            />
            <section className="createpost-form-submit">
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