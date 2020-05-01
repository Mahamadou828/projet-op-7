import React from "react" ; 
import TextField from '@material-ui/core/TextField';
import FilterMenu from "./FilterMenu" ; 
import CreatePost from "./CreatePost" ; 
import AccountSetting from "./AccountSetting" ; 
import PropTypes from "prop-types" ; 
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import "./style/style.scss" ; 
import { SwipeableDrawer } from "@material-ui/core";
  
  export default function Header(props) {

    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    return (
        <nav className="mainpage-nav">
            <React.Fragment>
                <Button className="mainpage-nav-buttonToggle" onClick={toggleDrawer("left", true)}><MenuIcon /></Button>
                <SwipeableDrawer
                anchor="left"
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
                >
                    <TextField
                    className="mainpage-nav-search"
                    id="outlined-full-width"
                    label="Search"
                    style={{ margin: 0 }}
                    placeholder="An post"
                    helperText="Enter the title of a post"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    />
                    <Button className="mainpage-icon">
                        <SearchIcon />
                        Search
                    </Button>
                    <Divider />
                    <FilterMenu />
                    <CreatePost
                    createAnNewPost={props.createAnNewPost}
                    verifyInput={props.verifyInput}
                    />
                    <AccountSetting />
                </SwipeableDrawer>
            </React.Fragment>
            <section className="mainpage-nav-logo">
                <i className="fas fa-globe"></i>
                <header>Groupomania</header>
            </section>
        </nav>
    );
  }

Header.propTypes = {
    verifyInput: PropTypes.func.isRequired , 
    createAnNewPost: PropTypes.func.isRequired
}