import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import { Button } from '@material-ui/core';
import UserList from '../components/UserList';
import Write from '../components/Write';
import lodash from 'lodash';
import GetMessage from '../function/GetMessage';
import ErrorAction from '../actions/ErrorAction';
import { Query } from 'react-apollo';
import { GetAllContact } from '../graphql/ChatQuery';
import { SendMessage, MessageCreated, MessageReceive } from '../socket/Message';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.contactList = [];
  }
  state = {
    idContact: null,
    contactInfo: null,
    messageList: [],
  };

  componentDidMount() {
    MessageReceive.bind(this)(this.addNewMessage);
    MessageCreated.bind(this)(this.addNewMessage);
  }

  onWrite = (id) => {
    GetMessage(this.props.UserId, parseInt(id))
      .then((data) => {
        const contactInfo = lodash.find([...this.contactList], (n) => {
          return n.id === id;
        });
        this.setState({
          idContact: contactInfo.id,
        });
        const write = (
          <Write
            contactInfo={contactInfo}
            open={true}
            close={this.writeClose}
            messageList={[...data.QueryGetAllMessage]}
            sendMessage={this.sendMessage}
          />
        );
        this.props.setComponent(write);
      })
      .catch((error) => {
        this.props.ErrorAction(true, JSON.stringify(error.message));
      });
  };

  writeClose = () => {
    this.props.setComponent(null);
  };

  sendMessage = (message) => {
    SendMessage.bind(this)(message);
  };

  addNewMessage = (message) => {
    this.setState({
      messageList: [...this.state.messageList, message],
    });
  };

  render() {
    return (
      <section className="chat">
        <Query
          query={GetAllContact}
          variables={{ UserId: this.props.UserId }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data }) => {
            if (!loading) {
              const userList = data.QueryContactInfo.contactList;
              this.contactList = [...userList];
              if (userList.length > 0) {
                return (
                  <UserList
                    button={true}
                    divider={false}
                    usersList={userList}
                    ListItemFunction={this.onWrite}
                  />
                );
              }
              return <DiscoverNewFriend redirect={this.props.redirect} />;
            } else if (error) {
              this.props.ErrorAction(true, JSON.stringify(error.message));
            } else return <p>wait...</p>;
          }}
        </Query>
      </section>
    );
  }
}

function DiscoverNewFriend({ redirect }) {
  return (
    <div className="text-center">
      <h3>
        Your contact List is empty
        <SentimentVeryDissatisfiedIcon />
      </h3>
      <Button
        className="button button-primary center"
        onClick={(e) => {
          redirect(e, 3);
        }}
      >
        Discover new Friend
        <SentimentSatisfiedIcon />
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  UserId: parseInt(state.Access.accessData.userInfo.id),
});

const mapDispatchToProps = {
  ErrorAction,
};

Chat.propTypes = {
  UserId: PropTypes.number,
  socket: PropTypes.object.isRequired,
  redirect: PropTypes.func.isRequired,
  setComponent: PropTypes.func.isRequired,
  ErrorAction: PropTypes.func,
};

DiscoverNewFriend.propTypes = {
  redirect: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
