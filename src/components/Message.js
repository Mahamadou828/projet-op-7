import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../components/Loader';
import FunctionPanel from '../components/FunctionPanel';
import AddIcon from '@material-ui/icons/Add';
import BlockIcon from '@material-ui/icons/Block';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import CommentIcon from '@material-ui/icons/Comment';
import ExploreForNewFriend from '../container/ExploreForNewFriend';
import FriendRequestList from '../container/FriendRequestList';
import PopUp from '../container/PopUp';
import Chat from '../container/Chat';
import { Tooltip, IconButton } from '@material-ui/core';
import ramdomNumber from '../function/ramdomNumber';
import EmptyArea from './EmptyArea';

class Message extends Component {
  constructor(props) {
    super(props);
    this.Icon = [
      <RecentActorsIcon key={ramdomNumber()} />,
      <AddIcon key={ramdomNumber()} />,
      <BlockIcon key={ramdomNumber()} />,
      <CommentIcon key={ramdomNumber()} />,
    ];

    this.text = [
      'Your contact',
      'Friend Request List',
      'User you Block',
      'Explore And Send friend Request',
    ];
  }

  state = {
    value: 0,
    ComponendToDisplay: null,
  };

  handleScroll = (newValue) => {
    this.setState({
      value: newValue,
    });
  };

  setComponent = (compo) => {
    this.setState({
      ComponendToDisplay: compo,
    });
  };

  renderItem = () => {
    switch (this.state.value) {
      case 0:
        return (
          <Chat
            socket={this.props.socket}
            redirect={this.handleScroll}
            setComponent={this.setComponent}
          />
        );
      case 1:
        return <FriendRequestList />;
      case 2:
        return <p>Je suis</p>;
      case 3:
        return <ExploreForNewFriend />;
    }
  };
  render() {
    return (
      <div className="container-row margin-none">
        <section className="container-flex">
          <FunctionPanel className="message-nav">
            <i className="fas fa-globe children ephemeral-tablette"></i>
          </FunctionPanel>
          <Loader />
        </section>
        <section className="block-full container-row">
          <section className="block-1">
            <header>
              <div className="container-row">
                <h1>Chats</h1>
                <div>
                  {this.Icon.map((icon, index) => (
                    <Tooltip key={ramdomNumber()} title={this.text[index]}>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          this.handleScroll(index);
                        }}
                      >
                        {icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </header>
            {this.renderItem()}
          </section>

          <section className="block-2">
            {this.state.ComponendToDisplay === null ? (
              <EmptyArea text="Welcome Start write to your Friend))" />
            ) : (
              this.state.ComponendToDisplay
            )}
          </section>
          <PopUp />
        </section>
      </div>
    );
  }
}

Message.propTypes = {
  socket: PropTypes.object,
};

export default Message;

// <AppBar position="static" color="default">
//             <Tabs
//               value={this.state.value}
//               onChange={this.handleScroll}
//               indicatorColor="primary"
//               textColor="primary"
//               aria-label="scrollable force tabs example"
//               variant="scrollable"
//               className="message"
//             >
//               <Tab
//                 label="Contact"
//                 icon={<RecentActorsIcon />}
//                 {...a11yProps(0)}
//                 className="message-tab"
//               />
//               <Tab
//                 label="Friend Request"
//                 icon={<AddIcon />}
//                 {...a11yProps(1)}
//               />
//               <Tab label="Black List" icon={<BlockIcon />} {...a11yProps(2)} />
//               <Tab label="Explore" icon={<CommentIcon />} {...a11yProps(3)} />
//             </Tabs>
//           </AppBar>
//           <TabPanel
//             className="message-elt paddingNone"
//             value={this.state.value}
//             index={0}
//           >
//             <Chat redirect={this.handleScroll} socket={this.props.socket} />
//           </TabPanel>
//           <TabPanel
//             className="message-elt paddingNone"
//             value={this.state.value}
//             index={1}
//           >
//             <FriendRequestList />
//           </TabPanel>
//           <TabPanel className="message-elt" value={this.state.value} index={3}>
//             <ExploreForNewFriend />
//           </TabPanel>
