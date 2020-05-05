import React from "react" ; 
import { Button, TextField } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AttachmentIcon from '@material-ui/icons/Attachment';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from "prop-types" ;

export default function WriteToAnUser({id_contact}) {

    const [load , setLoad] = React.useState(false) ; 

    if(!load) {
        const url = `${GET_ALL_MESSAGE}/${id_contact}`; 
        const myInit = {
            method: "GET" , 
            mode: "cors" , 
            cache: "default"
        }

        fetch(url , myInit)
        .then((respond) => {
            respond.json()
            .then((data) => {

            })
            .catch((error) => {

            })
        })
        .catch((error) => {

        })
    }

    return(
        <div className="write">
            <section className="write-contactinfo">
                <Button size="small">
                    <ArrowBackIosIcon />
                </Button>
            </section>

            <section className="write-form">
                <Button size="small">
                    <AttachmentIcon /> 
                </Button>
                <TextField
                id="message"
                label="Multiline"
                multiline
                rowsMax={4}
                />
                <Button size="small">
                    <MicIcon />
                </Button>
                <Button size="small">
                    <SendIcon />
                </Button>
            </section>
        </div>
    ) ; 
}

WriteToAnUser.propTypes = {
    id_contact: PropTypes.string.isRequired
}