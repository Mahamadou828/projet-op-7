import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactAction from '../actions/ContactAction';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import { Button } from '@material-ui/core';
import UserList from '../components/UserList';

class Chat extends Component {
  state = {
    writeToAUser: false,
  };

  componentDidMount() {
    this.props.ContactAction(this.props.UserId);
  }
  render() {
    return (
      <section className="chat">
        {this.props.contact.length === 0 ? (
          <DiscoverNewFriend redirect={this.props.redirect} />
        ) : null}
        <UserList usersList={this.props.contact}></UserList>
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
  contact: state.Contact.contact,
  UserId: parseInt(state.Access.accessData.userInfo.id),
});

const mapDispatchToProps = {
  ContactAction,
};

Chat.propTypes = {
  ContactAction: PropTypes.func,
  contact: PropTypes.array,
  UserId: PropTypes.number,
  redirect: PropTypes.func,
  contactList: PropTypes.object,
};

DiscoverNewFriend.propTypes = {
  redirect: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
