import React from "react" ; 
import { Button, TextField, Avatar } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AttachmentIcon from '@material-ui/icons/Attachment';
import socketIoClient from "socket.io-client" ; 
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from "prop-types" ;
import { GET_ALL_MESSAGE , BASE_ROUTE } from "../../RequestRoute";
import MessageComponent from ".";
import VerifyInput from "../../function/verifyInput";
import ramdomNumber from "../../function/ramdomNumber";

export default function WriteToAnUser({contact , id_user , contactList}) {
    const {name , surname , photo} = contact ; 
    const id_contact = contact.id_user ; 

    const [load , setLoad] = React.useState(false) ;
    const [message , setMessage] = React.useState([]) ; 
    const socketConnect = socketIoClient(BASE_ROUTE) ;

    const sendMessage = (socket , id_contact , id_user , value) => {
        if(VerifyInput(value , 4).result && value.length >= 1) {
            MessageComponent.sendMessage(value , socket , id_contact , id_user) ; 
            const obj = {
                content: value , 
                date: getActuallDate() , 
                receiver: id_contact , 
                sender: id_user , 
                status: 0   
            }
            setMessage([...message , obj]) ;
            document.querySelector("#message").value = " " ;
        }
    }

    if(!load) {
        const url = `${GET_ALL_MESSAGE}/${id_contact}/${id_user}`; 
        const myInit = {
            method: "GET" , 
            mode: "cors" , 
            cache: "default"
        }

        fetch(url , myInit)
        .then((respond) => {
            respond.json()
            .then((data) => {
                if(data.success) {
                    setMessage(data.message) ; 
                    setLoad(true) ; 
                }
            })
            .catch((error) => {

            })
        })
        .catch((error) => {

        })
    }

    socketConnect.on("messageSend" , () => {
    })

    socketConnect.on("receiveMessage" , (dataJSON) => {
        console.log("j'ai recu un message")
        const {message , contact} = JSON.stringify(dataJSON) ; 
        console.log(dataJSON) ; 
        if(contact === id_user) {
            console.log("C'est ca le message" , message) ; 
        }
    }) ;

    return(
        <div className="write">
            <section className="write-contactinfo">
                <Button size="small" onClick={() => contactList()}>
                    <ArrowBackIosIcon />
                </Button>
                <p>{name} {surname}</p>
                <Avatar className="write-contactinfo-img" src={photo} alt={name} />
            </section>

            <section className="write-corps">
                {message.length === 0 ? <p>Start message</p> : null}
                {message.length > 0 ? 
                message.map((row) => (
                    <div className={`${row.receiver === id_user ? "right" : "left"} write-message`} key={ramdomNumber()}>
                        <p>{row.content}</p>
                        <span className="date">{row.date}</span>
                    </div>
                ))
                : 
                null}
            </section>

            <section className="write-form">
                <Button size="small">
                    <AttachmentIcon /> 
                </Button>
                <TextField
                id="message"
                multiline
                rowsMax={4}
                className="textarea"
                />
                <Button size="small">
                    <MicIcon />
                </Button>
                <Button size="small" onClick={() => sendMessage(socketConnect , id_contact , id_user , document.querySelector("#message").value)}>
                    <SendIcon />
                </Button>
            </section>
        </div>
    ) ; 
}

function getActuallDate() {
    // console.log(Date.now().toUTCString()) ;
    return(Date.now()) ;
}

WriteToAnUser.propTypes = {
    contact: PropTypes.object.isRequired , 
    id_user: PropTypes.string.isRequired , 
    contactList: PropTypes.func.isRequired
}