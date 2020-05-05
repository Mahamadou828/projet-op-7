import React from "react" ; 
import { TextField, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search" ; 

export default function SearchContact () {

    return(
        <div className="searchcontact">
            <TextField id="searchcontact" label="Find Contact" />
            <Button><SearchIcon /></Button>
        </div>
    ) ;
}