import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import PropTypes from 'prop-types';

export default function UserList(props) {
  return (
    <List>
      {props.usersList.map((user) => (
        <ListItem key={user.id}>
          <ListItemAvatar>
            <Avatar>
              <img src={user.photo} alt="user avatar" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${user.name} ${user.surname}`}
            secondary={user.description}
          />
          <ListItemSecondaryAction
            onClick={() => {
              if (props.ToolTipFunction) {
                props.ToolTipFunction(user.id);
              }
            }}
          >
            {props.children}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

UserList.propTypes = {
  usersList: PropTypes.array,
  ToolTipFunction: PropTypes.func,
};
