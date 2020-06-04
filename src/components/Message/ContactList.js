import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropsType from "prop-types" ; 
import SearchContact from './SearchContact';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));  

export default function ContactList({contacts , contactUser}) {
    const classes = useStyles();
    return(
        <div className="container">
            <List className={`${classes.root} contactlist`}>
                <SearchContact />
                {contacts.map((contact) => (
                <div key={contact.id_user}>
                <ListItem onClick={() => contactUser(contact)} button alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={contact.name} src={contact.photo} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${contact.name} ${contact.surname}`}
                        secondary={
                        <React.Fragment>
                            <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                            >
                            </Typography>
                            {contact.lastMessage}
                        </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider />
                </div>
                ))}
                
            </List>
        </div>
    )
}

ContactList.propTypes = {
    contacts: PropsType.array.isRequired , 
    contactUser: PropsType.func.isRequired
}