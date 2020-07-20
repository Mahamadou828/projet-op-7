import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function MessageItem(props) {
  const classes = useStyles();
  const { UserId, WriterId } = props;
  const date = new Date(props.message.createdAt);
  const className = UserId === WriterId ? 'right' : 'left';
  return (
    <Card
      className={`${classes.root} ${className} item-message`}
      variant="outlined"
    >
      <CardActionArea className="item-content">
        <CardContent>
          <Typography variant="body2" component="p">
            {props.message.message}
          </Typography>
        </CardContent>
        <Avatar className="avatar">
          <img src={props.message.receiver.photo} alt="" />
        </Avatar>
      </CardActionArea>
      <h6>{JSON.stringify(date).replace(/"/g, '').split('T')[0]}</h6>
    </Card>
  );
}

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  UserId: PropTypes.string.isRequired,
  WriterId: PropTypes.string.isRequired,
};

export default MessageItem;
