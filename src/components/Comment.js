import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { findPostById } from '../selectors/Post';
import { Avatar, Typography, Divider } from '@material-ui/core';
import MediaComponent from './MediaComponent';
import ErrorAction from '../actions/ErrorAction';
import { getComment, addComment } from '../function/CommentQuery';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

function Comment(props) {
  const [open, setOpen] = React.useState(false);
  const scroll = 'body';
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const classes = useStyles();
  const [userComment, setUserComment] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (post === null && open) {
    setPost(findPostById(props.posts, props.PostId));
  }

  React.useEffect(() => {
    if (post !== null) {
      getComment(props.PostId)
        .then((comments) => {
          setComments(comments);
        })
        .catch((error) => {
          props.ErrorAction(true, error.message);
        });
    }
  }, [post]);

  const sendComment = () => {
    if (userComment.length > 0) {
      addComment(props.PostId, props.userId, userComment)
        .then((comment) => {
          if (comment.id) {
            const commentToAdd = {
              id: comment.id,
              content: comment.content,
              user: {
                name: props.userName,
                surname: props.userSurname,
                photo: props.userPhoto,
              },
            };
            setComments([commentToAdd, ...comments]);
            setUserComment('');
          }
        })
        .catch((error) => {
          props.ErrorAction(true, error.message);
        });
    }
  };

  return (
    <div>
      <IconButton
        aria-label="add to favorites"
        onClick={() => {
          handleClickOpen();
        }}
      >
        <ChatBubbleTwoToneIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className="comment"
      >
        {post !== null ? (
          <div>
            <div className="comment-header">
              <DialogTitle id="scroll-dialog-title">
                <Avatar aria-label="recipe" className="card-avatar">
                  <img src={post.users.photo} alt="..." />
                </Avatar>
                <p>
                  {post.users.name} {post.users.surname}
                </p>
              </DialogTitle>
              <DialogActions className="action">
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <CloseIcon />
                </Button>
              </DialogActions>
            </div>
            <DialogContent dividers={scroll === 'paper'}>
              <MediaComponent post={post} />
              <Typography variant="body2" color="textSecondary" component="p">
                {`${post.description.slice(0, 400)}${
                  post.description.length > 400 ? '...' : ''
                }`}
              </Typography>
              <Divider light />
              <FormControl
                className={`${classes.margin} ${classes.form} comment-form`}
              >
                <InputLabel htmlFor="input-with-icon-adornment">
                  {props.userName} {props.userSurname}
                </InputLabel>
                <Input
                  type="textarea"
                  id="input-with-icon-adornment"
                  onChange={(e) => {
                    setUserComment(e.target.value);
                  }}
                  value={userComment}
                  startAdornment={
                    <InputAdornment position="start">
                      <Avatar aria-label="recipe" className="card-avatar">
                        <img src={props.userPhoto} alt="..." />
                      </Avatar>
                    </InputAdornment>
                  }
                />
                <Button
                  className="form-corps-button"
                  onClick={() => {
                    sendComment();
                  }}
                >
                  Envoyer
                </Button>
              </FormControl>
              {comments.map((comment) => (
                <section key={comment.id}>
                  <Avatar aria-label="recipe" className="card-avatar">
                    <img src={comment.user.photo} alt="..." />
                  </Avatar>
                  <header>
                    <h5>
                      {comment.user.name} {comment.user.surname}
                    </h5>
                    <p>{comment.content}</p>
                  </header>
                </section>
              ))}
            </DialogContent>
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}

Comment.propTypes = {
  PostId: PropTypes.number,
  posts: PropTypes.array,
  ErrorAction: PropTypes.func,
  userName: PropTypes.string,
  userSurname: PropTypes.string,
  userPhoto: PropTypes.string,
  userId: PropTypes.number,
};

const mapStateToProps = (state) => ({
  posts: state.Posts.posts,
  userName: state.Access.accessData.userInfo.name,
  userSurname: state.Access.accessData.userInfo.surname,
  userPhoto: state.Access.accessData.userInfo.photo,
  userId: parseInt(state.Access.accessData.userInfo.id),
});

const mapDispatchToProps = {
  ErrorAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
