import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, pink, grey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
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

function PostBadgeGroup(props) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [like, setLike] = useState(props.appreciate.like);
  const [dislike, setDislike] = useState(props.appreciate.dislike);

  const { description, content } = props;

  const [numLike, setNumLike] = useState(props.likeNumber.numLike);
  const [numDislike, setNumDislike] = useState(props.likeNumber.numDislike);

  const [initComponent, setInitComponent] = useState(true);

  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    if (!initComponent) {
      if (renderCount <= 4) {
        setRenderCount(renderCount + 1);
        props.setPostAppreciation(like, dislike);
      }
    }
  }, [numLike, numDislike]);

  useEffect(() => {
    if (!initComponent) {
      if (like) {
        setNumLike(numLike + 1);
      } else {
        setNumLike(numLike - 1);
      }
    }
  }, [like]);

  useEffect(() => {
    if (!initComponent) {
      if (dislike) {
        setNumDislike(numDislike + 1);
      } else {
        setNumDislike(numDislike - 1);
      }
    }
  }, [dislike]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const updateLike = (likeStatus) => {
    if (like && !likeStatus) {
      setLike(false);
    } else {
      setLike(likeStatus);
      setDislike(!likeStatus);
    }

    if (initComponent) {
      setInitComponent(false);
    }
  };

  const updateDislike = (dislikeStatus) => {
    if (dislike && !dislikeStatus) {
      setDislike(false);
    } else {
      setDislike(dislikeStatus);
      setLike(!dislikeStatus);
    }

    if (initComponent) {
      setInitComponent(false);
    }
  };

  return (
    <div>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            updateLike(!like);
          }}
        >
          <StyledBadge badgeContent={numLike} color="secondary">
            <FavoriteIcon
              style={like ? { color: pink[500] } : { color: grey[800] }}
            />
          </StyledBadge>
        </IconButton>

        <IconButton
          aria-label="share"
          onClick={() => {
            updateDislike(!dislike);
          }}
        >
          <StyledBadge badgeContent={numDislike} color="error">
            <ThumbDownAltIcon
              style={dislike ? { color: red[900] } : { color: grey[800] }}
            />
          </StyledBadge>
        </IconButton>

        <IconButton aria-label="add to favorites" onClick={() => {}}>
          <ChatBubbleTwoToneIcon />
        </IconButton>

        <IconButton aria-label="share" onClick={() => {}}>
          <StyledBadge badgeContent={0} color="secondary">
            <ShareIcon />
          </StyledBadge>
        </IconButton>

        {content !== null ? (
          <Button>
            <VisibilityIcon onClick={() => {}} />
          </Button>
        ) : null}

        {description.length > 75 ? (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        ) : null}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </div>
  );
}

PostBadgeGroup.propTypes = {
  description: PropTypes.string,
  likeNumber: PropTypes.object,
  content: PropTypes.string,
  appreciate: PropTypes.object,
  setPostAppreciation: PropTypes.func,
};

export default PostBadgeGroup;
