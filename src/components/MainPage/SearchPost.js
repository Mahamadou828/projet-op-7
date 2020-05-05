import React from "react" ; 
import { TextField, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search" ; 

export default function SearchPost() {
    return (
        <section className="searchpost">
            <TextField id="searchpost" label="Find Post" />
            <Button><SearchIcon /></Button>
        </section>
    )
}