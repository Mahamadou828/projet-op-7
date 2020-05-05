import React from "react" ; 
import { Button } from "@material-ui/core";

export default function Filter() {

    return(
        <section className="filter">
            <header className="title">
                <h1>Filter Mode</h1>
                <hr className="line" />
            </header>
            <Button>Refresh Post</Button>
            <Button>Post you like</Button>
            <Button>Post you dislike</Button>
            <Button>Post you share</Button>
        </section>
    ) ; 
}