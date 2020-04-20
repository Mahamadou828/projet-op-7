import React from "react" ; 
import TextField from '@material-ui/core/TextField';
import FilterMenu from "./FilterMenu" ; 
import CreatePost from "./CreatePost" ; 
import AccountSetting from "./AccountSetting" ; 
import "./style/style.scss" ; 
import PropTypes from "prop-types" ; 

export default function Header(props) {
    return(
        <nav className="mainpage-nav">
            <section className="mainpage-nav-logo">
                <i className="fas fa-globe"></i>
                <header>Groupomania</header>
            </section>
            <FilterMenu />
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
            <CreatePost
                createAnNewPost={props.createAnNewPost}
                verifyInput={props.verifyInput}
            />

            <AccountSetting />
        </nav>
    ) ; 
}

Header.propTypes = {
    verifyInput: PropTypes.func.isRequired , 
    createAnNewPost: PropTypes.func.isRequired
}