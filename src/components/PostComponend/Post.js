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
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from "prop-types" ; 
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
        //     <img src={props.avatar} alt="..." />
        //   </Avatar>
        // }
        title={`${props.name} ${props.surname}`}
      />
      <CardMedia
        className={classes.media}
        image={props.image}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="h3">
          {props.title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${props.description.slice(0 , 75)}${props.description.length > 75 ? "..." : null}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <IconButton aria-label="add to favorites">
          <StyledBadge badgeContent={props.like} color="secondary">
            <FavoriteIcon onClick={() =>{props.onLike()}} />
          </StyledBadge> 
        </IconButton>

        <IconButton aria-label="add to favorites">
          <StyledBadge badgeContent={0} color="secondary">
            <ChatBubbleTwoToneIcon onClick={() => props.onComment()} />
          </StyledBadge> 
        </IconButton>

        <IconButton aria-label="share">
          <StyledBadge badgeContent={props.share} color="secondary">
            <ShareIcon onClick={() => props.onShare()} />
          </StyledBadge>
        </IconButton>

        <IconButton aria-label="share">
          <StyledBadge badgeContent={props.dislike} color="secondary">
            <ThumbDownAltIcon onClick={() => props.onDislike()} />
          </StyledBadge>
        </IconButton>

        {typeof (props.content) === "string" ? <Button><VisibilityIcon onClick={() => props.onRead()} /></Button> : null}

        {props.description.length > 75 ? 
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
            {props.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

Post.propTypes = {
  avatar: PropTypes.string.isRequired , 
  name: PropTypes.string.isRequired , 
  surname: PropTypes.string.isRequired ,
  image: PropTypes.string.isRequired ,
  content: PropTypes.string ,
  description: PropTypes.string.isRequired ,
  title: PropTypes.string.isRequired , 
  like: PropTypes.number.isRequired , 
  dislike: PropTypes.number.isRequired , 
  share: PropTypes.number.isRequired , 
  onLike: PropTypes.func.isRequired , 
  onDislike: PropTypes.func.isRequired , 
  onShare: PropTypes.func.isRequired , 
  onComment: PropTypes.func.isRequired , 
  onRead: PropTypes.func.isRequired
}