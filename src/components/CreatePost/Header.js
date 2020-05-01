import React from "react" ; 
import Button from '@material-ui/core/Button';
import PropsType from "prop-types" ; 

export default function Header(props) {

    return (
        <section className="markdown-header">
            <header className="markdown-header-logo">
                <i className="fas fa-globe"></i>
                <h1>GROUPEMANIA</h1>
            </header>
            <article className="markdown-header-button">
                <Button variant="outlined" color="primary" onClick={() => props.save()}>
                    Save
                </Button>
            </article>
        </section>
    ) ; 
}

Header.propTypes = {
    save: PropsType.func.isRequired 
}