import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import CreatePost from '../container/CreatePost';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FunctionPanel() {
  const classes = useStyles();

  return (
    <div className={`${classes.root} bottomNavigation`}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText className="bottomNavigation-text" primary="Message" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText className="bottomNavigation-text" primary="Parameter" />
        </ListItem>
      </List>
      <Divider className="ephemeral-mobile" />
      <CreatePost />
      <Divider className="ephemeral-mobile" />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText
            className="bottomNavigation-text"
            primary="Log out and disconnect"
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MusicVideoIcon />
          </ListItemIcon>
          <ListItemText className="bottomNavigation-text" primary="Music" />
        </ListItem>
      </List>
    </div>
  );
}
