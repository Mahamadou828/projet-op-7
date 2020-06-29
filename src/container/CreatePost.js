import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { reduxForm, Field } from 'redux-form';
import FieldInput from '../components/FieldInput';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import LanguageIcon from '@material-ui/icons/Language';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import { VerifyFile } from '../function/verifyInput';
import LoaderAction from '../actions/LoaderAction';
import CreatePostAction from '../actions/CreatePostAction';
import ErrorAction from '../actions/ErrorAction';
import ToggleError from '../components/ToggleError';
import ramdomNumber from '../function/ramdomNumber';

const Fields = {
  title: 'title',
  description: 'description',
  file: 'file',
  simplePost: 'simplePost',
};

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

function CreatePost(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (dataPost) => {
    setOpen(false);
    props.LoaderAction(4, true);
    try {
      dataPost.UserId = parseInt(props.userId);
      props.CreatePostAction(dataPost);
    } catch {
      props.ErrorAction(
        true,
        "Internal Error it's seem you're not connected please leave this page an connect you"
      );
    }
  };
  const generateFormError = () => {
    if (props.errors.syncErrors !== undefined) {
      const entries = Object.keys(props.errors.syncErrors);
      return entries.map((key) => {
        return props.errors.syncErrors[key].length > 0 ? (
          <ToggleError
            key={ramdomNumber()}
            message={`${key}: ${props.errors.syncErrors[key]}`}
          />
        ) : null;
      });
    } else {
      return null;
    }
  };
  return (
    <div className="createpost">
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <BorderColorIcon />
        </ListItemIcon>
        <ListItemText primary="Create a post" />
      </ListItem>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={`${classes.appBar} createpost-corps`}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <article className=" createpost-logo">
                <h1>
                  Group
                  <LanguageIcon />
                  mania
                </h1>
              </article>
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <form
            className="form-corps"
            onSubmit={props.handleSubmit(handleSubmit)}
          >
            <Field
              id={Fields.title}
              name={Fields.title}
              component={FieldInput}
              props={{
                label: 'Enter a title name',
                idfield: 1,
                type: 'text',
                class: 'row text-center',
                error: '',
              }}
              type="text"
            />
            <Field
              component={FieldInput}
              props={{
                label: 'Enter the content of the post*',
                idfield: 3,
                class: 'row text-center',
                error: 'only this label is really required',
              }}
              id={Fields.description}
              name={Fields.description}
            />
            <Field
              name={Fields.file}
              props={{
                label: 'Upload a additional file',
                idInput: Fields.file,
                acceptList: ['jpg', 'bmp', 'png', 'jpeg', 'mov', 'mp4'],
                class: 'file',
                idfield: 4,
                error: '',
              }}
              type="file"
              defaultValue="null"
              component={FieldInput}
            />
            <Field
              component={FieldInput}
              props={{
                color: 'primary',
                idfield: 2,
                label: 'Open Post Creator',
                class: 'row center',
              }}
              id={Fields.simplePost}
              name={Fields.simplePost}
            />
            <Button className="form-corps-button" type="submit">
              Submit
            </Button>
          </form>
          {props.errors !== undefined ? generateFormError() : null}
        </List>
      </Dialog>
    </div>
  );
}

CreatePost.propTypes = {
  LoaderAction: PropTypes.func,
  CreatePostAction: PropTypes.func,
  ErrorAction: PropTypes.func,
  userId: PropTypes.number,
  errors: PropTypes.object,
};

const mapDispatchToProps = {
  LoaderAction,
  CreatePostAction,
  ErrorAction,
};

const mapStateToProps = (state) => {
  return {
    userId: state.Access.accessData.userInfo.id,
    errors: state.form.CreatePost,
  };
};

const validate = (values) => {
  const errors = {
    title: '',
    description: '',
    file: '',
  };
  const { file, title, description } = values;
  const validationCriteriaFile = {
    extensionList: ['jpg', 'gif', 'bmp', 'png', 'mov', 'mp4'],
    size: '10000000',
  };

  if (file) {
    errors.file = VerifyFile(file, validationCriteriaFile);
  }

  if (title && title.length > 40) {
    errors.title = 'Title is to long!!';
  }

  if (!description) {
    errors.description = 'Description Requires';
  } else if (description.length > 750) {
    errors.description = 'Description tooo long';
  }

  return errors;
};

const CreatePostForm = reduxForm({
  form: 'CreatePost',
  fields: Object.keys(Fields),
  validate: validate,
})(CreatePost);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostForm);
