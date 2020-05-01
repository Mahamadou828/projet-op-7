import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red , pink , grey} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Divider } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from "prop-types" ; 
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import Comment from "./Comment" ;
import { MyContext } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function Post(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [showComment , setShowComment] = React.useState(false) ; 

  const value = React.useContext(MyContext) ;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <img src={value.post.avatarCreator} alt="..." />
            </Avatar>
          }
          title={`${value.post.name} ${value.post.surname}`}
        />
        <CardMedia
          className={classes.media}
          image={value.post.image}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="h3">
            {value.post.title}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${value.post.description.slice(0 , 75)}${value.post.description.length > 75 ? "..." : null}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>

          <IconButton aria-label="add to favorites" onClick={() =>{props.onLike()}} >
            <StyledBadge badgeContent={props.like} color="secondary">
                <FavoriteIcon style={props.stateLike ? {color:pink[500]} : {color:grey[800]}} />
            </StyledBadge> 
          </IconButton>
          

          <IconButton aria-label="share" onClick={() => props.onDislike()}>
            <StyledBadge badgeContent={props.dislike} color="error">
              <ThumbDownAltIcon style={props.stateDislike ? {color:red[900]} : {color:grey[800]}} />
            </StyledBadge>
          </IconButton>

          <IconButton aria-label="add to favorites" onClick={() => {setShowComment(!showComment)}} >
              <ChatBubbleTwoToneIcon />
          </IconButton>

          <IconButton aria-label="share" onClick={() => props.onShare()} >
            <StyledBadge badgeContent={props.share} color="secondary">
              <ShareIcon />
            </StyledBadge>
          </IconButton>

          {typeof (value.post.content) === "string" ? <Button><VisibilityIcon onClick={() => props.onRead()} /></Button> : null}

          {value.post.description.length > 75 ? 
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton> : null }
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {value.post.description}
            </Typography>
          </CardContent>
        </Collapse>

        <Divider />

        {showComment ? 
        <Comment 
        id_post={value.post.id} 
        id_user={value.id_user} 
        /> 
        : null}
      </Card>
  );
}
 
Post.propTypes = {
  like: PropTypes.number.isRequired , 
  dislike: PropTypes.number.isRequired , 
  stateLike: PropTypes.bool.isRequired , 
  stateDislike: PropTypes.bool.isRequired ,
  share: PropTypes.number.isRequired , 
  onLike: PropTypes.func.isRequired , 
  onDislike: PropTypes.func.isRequired , 
  onShare: PropTypes.func.isRequired , 
  onRead: PropTypes.func.isRequired
}