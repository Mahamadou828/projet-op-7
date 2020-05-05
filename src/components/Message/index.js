import React , {PureComponent} from "react" ; 
import Button from '@material-ui/core/Button';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import "./style/style.scss" ; 
import { GET_ALL_CONTACT, GET_ALL_USER_CONTACT } from "../../RequestRoute";
import Header from "../Header";
import GeneralContext from "../../GeneralContext";
import App from "../App";
import ContactList from "./ContactList";
import UserInfo from "../MainPage/UserInfo";
import "./style/style.scss" ; 
import Notification from "./Notification";
import WriteToAnUser from "./WriteToAnUser";

export default class MessageComponent extends PureComponent {

    constructor(props) {
        super(props) ; 
        this.contactList = [] ; 
    }

    state = {
        loadingComplete: false , 
        selectedContact: false , 
        id_contact: null
    }

    onContactOneUser = (id_contact) => {
        console.log(id_contact)
        this.setState({
            selectedContact: true ,
            id_contact: id_contact
        })
    }

    getAllUser = () => {
        this.setState({
            loadingComplete: false
        })
        const url = GET_ALL_USER_CONTACT ; 
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
                    console.log("tout les user" , data)
                    this.contactList = data.user ; 
                    this.setState({
                        loadingComplete: true
                    })
                }
            })
            .catch((error) => {})
        })
        .catch((error) => {})
    }

    componentDidMount(){
        const url = `${GET_ALL_CONTACT}/${App.verifyConnect(this.context).id_user}` ; 
        const myInit = {
            method: "GET" , 
            mode: "cors" , 
            cache: "default"
        }

        fetch(url , myInit)
        .then((respondJSON) => {
            respondJSON.json()
            .then((data) => {
                if(data.success) {
                    console.log("le component did mount" , data) ; 
                    this.contactList = data.contact ; 
                    this.setState({
                        loadingComplete: true 
                    })
                }
            })
            .catch((error) => {

            })
        })
        .catch((error) => {

        })

        this.setState({
            id_user: App.verifyConnect(this.context).id_user , 
            redirect: App.verifyConnect(this.context).redirect
        })
    }

    
    
    render() {
        return(
            <section className="message">
                <Header />

                <article className="message-corps">
                    <UserInfo />

                    {this.state.loadingComplete && (this.contactList.length > 0) && (!this.state.selectedContact) ? 
                    <ContactList 
                    contacts={this.contactList}
                    contactUser={this.onContactOneUser}
                    />
                    :
                    <article className="emptycontact">
                        <h1>You contact noone</h1>
                        <SentimentVeryDissatisfiedIcon />
                        <Button onClick={() => this.getAllUser()}>See All User</Button>
                    </article>
                    }

                    {this.state.selectedContact ? 
                    <WriteToAnUser 
                    id_contact={this.state.id_contact}
                    />
                    : 
                    null}

                    <Notification />
                </article>
            </section>
        )
    }
}

MessageComponent.contextType = GeneralContext ; 