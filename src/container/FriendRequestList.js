import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import ErrorAction from '../actions/ErrorAction';
import {
  GetAllFriendRequest,
  RespondToFriendRequest,
} from '../graphql/ChatQuery';
import UserList from '../components/UserList';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { Tooltip, IconButton } from '@material-ui/core';
import { client } from '..';
import LoaderAction from '../actions/LoaderAction';

class FriendRequestList extends Component {
  constructor(props) {
    super(props);
    this.loading = false;
    this.contactId = null;
  }
  state = {
    type: '',
  };

  getContactId = (key) => {
    this.contactId = key;
  };

  sendRespondToFriendRequest = (Type) => {
    if (!this.loading) {
      setTimeout(() => {
        this.loading = true;
        client
          .mutate({
            mutation: RespondToFriendRequest,
            variables: {
              UserId: this.props.UserId,
              ContactId: parseInt(this.contactId),
              Type,
            },
          })
          .then(({ data }) => {
            let message = `this user has been ${Type}ed`;
            if (!data.MutationRespondToFriendRequest) {
              message = "There's an problem try again";
            }
            this.loading = false;
            this.props.LoaderAction(0, false, true, message);
          })
          .catch((error) => {
            this.props.ErrorAction(true, JSON.stringify(error.message));
            this.loading = false;
          });
      }, 200);
    }
  };

  render() {
    return (
      <Query
        query={GetAllFriendRequest}
        fetchPolicy="network-only"
        variables={{ UserId: this.props.UserId }}
      >
        {({ loading, error, data }) => {
          if (!loading) {
            const userList = data.QueryContactInfo.FriendRequestList;
            if (userList.length > 0) {
              return (
                <UserList
                  usersList={userList}
                  button={false}
                  divider={false}
                  ToolTipFunction={this.getContactId}
                >
                  <Tooltip title="accept request">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        this.sendRespondToFriendRequest('accept');
                      }}
                    >
                      <DoneAllIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="denied request">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        this.sendRespondToFriendRequest('denied');
                      }}
                    >
                      <PersonPinIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="block this user">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        this.sendRespondToFriendRequest('block');
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                </UserList>
              );
            } else {
              return <p>Empty</p>;
            }
          } else if (error) {
            this.props.ErrorAction(true, JSON.stringify(error.message));
          } else return <p>Wait...</p>;
        }}
      </Query>
    );
  }
}

FriendRequestList.propTypes = {
  UserId: PropTypes.number,
  LoaderAction: PropTypes.func,
  ErrorAction: PropTypes.func,
};

const mapStateToProps = (state) => ({
  UserId: parseInt(state.Access.accessData.userInfo.id),
});

const mapDispatchToProps = {
  ErrorAction,
  LoaderAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestList);
