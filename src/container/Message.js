import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import PopUp from './PopUp';
import FunctionPanel from '../components/FunctionPanel';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import BlockIcon from '@material-ui/icons/Block';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import TabPanel from '../components/Tab';
import { a11yProps } from '../components/Tab';
import CommentIcon from '@material-ui/icons/Comment';
import Chat from './Chat';
import ramdomNumber from '../function/ramdomNumber';
import lodash, { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import { GetAllUser } from '../graphql/UserQuery';
import ErrorAction from '../actions/ErrorAction';
import LoaderAction from '../actions/LoaderAction';
import { GetAllContact } from '../graphql/ChatQuery';
import CreateFriendRequest from '../function/CreateFriendRequest';
import UserList from '../components/UserList';
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

class Message extends Component {
  constructor(props) {
    super(props);
    this.tabElement = [
      <Chat key={ramdomNumber()} redirect={this.handleScroll} />,
      <p key={ramdomNumber()}>Un item</p>,
      <p key={ramdomNumber()}>Un item</p>,
    ];
  }

  sendFriendRequest = (FriendId) => {
    CreateFriendRequest(this.props.UserId, FriendId)
      .then(({ MutationCreateFriendRequest }) => {
        if (MutationCreateFriendRequest) {
          this.props.LoaderAction(
            0,
            false,
            true,
            'Your request has been send. Wait for a respond'
          );
        }
      })
      .catch((error) => {
        this.props.ErrorAction(true, error.message);
      });
  };

  state = {
    value: 0,
  };

  handleScroll = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };
  render() {
    let usersList = [];
    const { value } = this.state;
    if (!this.props.getAllUser.loading) {
      usersList = lodash.remove(
        [...this.props.getAllUser.QueryGetAllUser],
        (n) => {
          return n.id !== this.props.UserId;
        }
      );
    }
    return (
      <div className="container">
        <section className="block-md container-flex">
          <FunctionPanel />
          <Loader />
        </section>
        <section className="block-lg">
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleScroll}
              indicatorColor="primary"
              textColor="primary"
              aria-label="scrollable force tabs example"
              variant="scrollable"
              className="message"
            >
              <Tab
                label="Contact"
                icon={<RecentActorsIcon />}
                {...a11yProps(0)}
                className="message-tab"
              />
              <Tab
                label="Friend Request"
                icon={<AddIcon />}
                {...a11yProps(1)}
              />
              <Tab label="Black List" icon={<BlockIcon />} {...a11yProps(2)} />
              <Tab label="Explore" icon={<CommentIcon />} {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          {this.tabElement.map((elt, index) => (
            <TabPanel
              key={ramdomNumber()}
              className="message-elt"
              value={value}
              index={index}
            >
              {elt}
            </TabPanel>
          ))}

          {!this.props.getAllUser.loading ? (
            <TabPanel className="message-elt" value={value} index={3}>
              <UserList
                usersList={usersList}
                ToolTipFunction={this.sendFriendRequest}
              >
                <Tooltip title="Send A Friend Request">
                  <IconButton edge="end" aria-label="delete">
                    <AddToPhotosOutlinedIcon className="icon icon-bg" />
                  </IconButton>
                </Tooltip>
              </UserList>
            </TabPanel>
          ) : null}
        </section>
        <PopUp />
      </div>
    );
  }
}

Message.propTypes = {
  socket: PropTypes.object,
};

const mapStateToProps = (state) => ({
  UserId: state.Access.accessData.userInfo.id,
});
const mapDispatchToProps = {
  ErrorAction,
  LoaderAction,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(GetAllUser, {
    name: 'getAllUser',
  }),
  graphql(GetAllContact, {
    name: 'getAllContact',
    options: async (props) => {
      return {
        variables: {
          UserId: props.UserId,
        },
      };
    },
  })
)(Message);
