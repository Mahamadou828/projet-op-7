import React from "react" ;
import Header from "../Header" ; 
import PostComponend from "../PostComponend" ; 
import ramdomNumber from "../../function/ramdomNumber" ; 
import PropsType from "prop-types" ; 
import { GET_ALL_POST, GET_INFORMATION_OF_AN_USER } from "../../RequestRoute";
import GeneralContext from "../../GeneralContext";
import "./style/style.scss" ;
import Filter from "./Filter";
import SearchPost from "./SearchPost" ;
import UserInfo from "./UserInfo";
import App from "../App";
import BestPost from "./BestPost";
import PostUser from "./PostUser";

export default class MainPage extends React.Component {

    constructor(props) {
        super(props) ; 
        this.content = [] ; 
    }

    state = {
        verificationForPostInput: false ,
        loadComplete: false , 
        showAlert: false , 
        submit: false , 
        error: "" , 
        code: 0 , 
    }

    componentDidMount() {
        this.setState({
            id_user: App.verifyConnect(this.context).id_user , 
            redirect: App.verifyConnect(this.context).redirect, 
            path: App.verifyConnect(this.context).redirect ? " " : "/"
        })
        this.onRefreshPost() ; 
    }

    onRefreshPost = () => {
        
        const url = GET_ALL_POST ; 

        const myInit = {
            method: "POST" , 
            mode: "cors" , 
            cache: "default"
        }
        fetch(url , myInit) 
        .then ((respond) => {
            respond.json()
            .then((data) => {
                data.allPost.forEach((element) => {
                    this.content.push(
                        <PostComponend 
                            post={element}
                            key={ramdomNumber()}
                            id_user={this.state.id_user}
                        />
                )})
                this.setState({
                    loadComplete: true
                })
            })
            .catch(() => {
                this.setState({
                    error: "An occurence error"
                }) 
            })
        })
        .catch(() => {
            this.setState({
                error: "An occurence error"
            }) 
        });  
    }

    
    onFilterMode = (code) => {
        this.setState({
            code: code , 
        })
    }

    static getInformationUser(id_user) {
        return new Promise((resolve , reject) => {
            const myInit = {
                method: "GET" , 
                mode: "cors" , 
                cache: "default"
            }
    
            fetch(`${GET_INFORMATION_OF_AN_USER}/${id_user}` , myInit)
            .then((respond) => {
                respond.json()
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                })
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    render() {
        return(
            <div className="homepage">
                <Header />

                <aside className="panel-rigth">
                    <UserInfo />
                    <Filter />    
                    <BestPost />
                </aside>

                <aside className="panel-left">
                    <PostUser />
                </aside>
                
                <SearchPost />

                {   this.state.loadComplete ?
                    this.content : null
                }
            </div>
        ) ;
    }
}

MainPage.contextType = GeneralContext ;

MainPage.propTypes = {
    match: PropsType.object.isRequired
}