import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { GetAllUser } from '../graphql/UserQuery';
import ErrorAction from '../actions/ErrorAction';
import UserList from '../components/UserList';
import { Tooltip, IconButton } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { client } from '..';
import { SendFriendRequest } from '../graphql/ChatQuery';
import LoaderAction from '../actions/LoaderAction';
import PropTypes from 'prop-types';

class ExploreForNewFriend extends Component {
  sendFriendRequest = (ContactId) => {
    client
      .mutate({
        mutation: SendFriendRequest,
        variables: { ContactId, UserId: this.props.UserId },
      })
      .then(({ data }) => {
        let message = 'Request send';
        if (!data.MutationSendFriendRequest) {
          message = 'This user block you or you already send an request to him';
        }
        this.props.LoaderAction(0, false, true, message);
      })
      .catch((error) => {
        this.props.ErrorAction(true, JSON.stringify(error.message));
      });
  };

  render() {
    return (
      <Query
        query={GetAllUser}
        fetchPolicy="network-only"
        variables={{ UserId: this.props.UserId }}
      >
        {({ loading, data, error }) => {
          if (!loading) {
            const userList = data.QueryGetAllUser;
            return (
              <UserList
                usersList={userList}
                ToolTipFunction={this.sendFriendRequest}
                button={false}
                divider={false}
              >
                <Tooltip title="Send A Friend Request">
                  <IconButton edge="end" aria-label="delete">
                    <AddBoxIcon className="icon icon-bg" />
                  </IconButton>
                </Tooltip>
              </UserList>
            );
          } else if (error) {
            this.props.ErrorAction(true, JSON.stringify(error.message));
          }
          return <p>En coures</p>;
        }}
      </Query>
    );
  }
}

ExploreForNewFriend.propTypes = {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreForNewFriend);
