import React from "react" ; 
import TextField from '@material-ui/core/TextField';
import PropsType from "prop-types" ; 

export default function Markdown(props) {

    return (
        <section className="markdown-write">
            <TextField
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="30"
            className="markdown-write-content"
            onChange={(event) => props.write(event)}
            />
            <div className="markdown-write-result"></div>
        </section>
    ) ; 
}

Markdown.propTypes = {
    write: PropsType.func.isRequired
}