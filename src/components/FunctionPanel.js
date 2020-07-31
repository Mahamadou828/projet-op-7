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
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccessAction from '../actions/AccessAction';
import HomeIcon from '@material-ui/icons/Home';
import PropTypes from 'prop-types';
import { client } from '..';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function FunctionPanel(props) {
  const classes = useStyles();

  const Redirect = (route) => {
    props.history.push(`/${route}`);
  };

  const disconnect = () => {
    client.resetStore();
    props.AccessAction({ access: false, jwt: '', error: '', userInfo: {} });
    props.history.push('/');
  };

  const generateItem = () => {
    const localRoute = props.history.location.pathname;
    if (localRoute !== '/home') {
      return (
        <List
          component="nav"
          className="homeItem"
          aria-label="main mailbox folders"
        >
          <ListItem
            button
            onClick={() => {
              props.history.push(`/home`);
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText className="bottomNavigation-text" primary="Home" />
          </ListItem>
        </List>
      );
    }
    return <CreatePost />;
  };
  return (
    <div className={`${classes.root} bottomNavigation ${props.className}`}>
      {props.children}
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          onClick={() => {
            Redirect('message');
          }}
        >
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
      {generateItem()}
      <Divider className="ephemeral-mobile" />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem
          button
          onClick={() => {
            disconnect();
          }}
        >
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

FunctionPanel.propTypes = {
  history: PropTypes.object,
  className: PropTypes.string,
  AccessAction: PropTypes.func,
  children: PropTypes.object,
};
const mapDispatchToProps = {
  AccessAction,
};

export default withRouter(connect(null, mapDispatchToProps)(FunctionPanel));
