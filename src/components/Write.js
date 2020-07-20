import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/Send';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import MessageItem from './MessageItem';
import { Avatar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const options = ['None', 'Atria', 'Callisto'];

const ITEM_HEIGHT = 48;

function Write(props) {
  const [message, setMessage] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { contactInfo } = props;
  return (
    <div>
      <section className="write-header">
        <header>
          <Avatar>
            <img src={contactInfo.photo} alt="" />
          </Avatar>
          <h6>
            {contactInfo.name} {contactInfo.surname}
          </h6>
        </header>
      </section>
      <section className="write-message">
        {props.messageList.map((message) => (
          <MessageItem
            message={message}
            UserId={props.UserId}
            key={message.id}
            WriterId={message.receiver.id}
          />
        ))}
      </section>
      <Paper
        component="form"
        className="write-form"
        onSubmit={(e) => {
          e.preventDefault();
          props.sendMessage(message);
        }}
      >
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AddCircleOutlineIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === 'Pyxis'}
              onClick={handleClose}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        <IconButton aria-label="directions">
          <KeyboardVoiceIcon />
        </IconButton>
        <InputBase
          placeholder="Send Message"
          inputProps={{ 'aria-label': 'Send Message' }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        />
        <IconButton type="submit" aria-label="search">
          <SendIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  error: state.Error.error,
  UserId: state.Access.accessData.userInfo.id,
});

Write.propTypes = {
  contactInfo: PropTypes.object.isRequired,
  error: PropTypes.bool,
  close: PropTypes.func.isRequired,
  messageList: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  UserId: PropTypes.string,
};

export default connect(mapStateToProps, null)(Write);
