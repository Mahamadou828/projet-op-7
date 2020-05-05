import React from "react" ; 
import { GET_MOST_POPULAR_USER_POST } from "../../RequestRoute";
import GeneralContext from "../../GeneralContext";
import App from "../App";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Skeleton from "@material-ui/lab/Skeleton";
import { Button } from "@material-ui/core";

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

export default function PostUser() {

    const classes = useStyles() ; 

    const MyContext = React.useContext(GeneralContext) ; 

    const [load , setLoad] = React.useState(false) ; 
    const [posts , setPost] = React.useState(false) ; 

    if (!load) {
        const id = App.verifyConnect(MyContext).id_user
        const url =`${GET_MOST_POPULAR_USER_POST}/${id}`
        const myInit = {
            method: "GET" , 
            mode: "cors" , 
            cache: "default"
        }

        fetch(url , myInit)
        .then((respond) => {
            respond.json()
            .then((data) => {
                if (data.success) {
                    setPost(data.post) ;
                    setLoad(true) ; 
                }
            })
            .catch((error) => {

            })
        })
        .catch((error) => {

        })
    }

    return(
        <section className="bestpost">
            <header className="title">
                <h1>Your Most Popular Post</h1>
                <hr className="line" />
            </header>
        {load ? 
            <List className={classes.root}>
                {posts.map((post) => (
                    <div key={post.id} >
                        <ListItem  alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt={post.name} src={post.photo} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={post.name}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {post.title}
                            </Typography>
                            {` — ${post.description.slice(0 , 75)}…`}
                            <Button>See more</Button>
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))}
            </List>
            :
        <article>
            <Skeleton variant="text" />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="rect" width={210} height={118} />
        </article>
    }
        </section>
        
    )
}