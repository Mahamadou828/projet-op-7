import React from "react" ; 
import MainPage from "./index" ; 
import Skeleton from "@material-ui/lab/Skeleton" ; 
import App from "../App";
import GeneralContext from "../../GeneralContext";
import { Avatar } from "@material-ui/core";

export default function UserInfo() {
    
    const MyContext = React.useContext(GeneralContext) ; 
    const [load , setLoad] = React.useState(false) ; 
    const [information , setInformation] = React.useState(false) ; 
    const idUser = App.verifyConnect(MyContext).id_user ; 
    if (!load) 
    {
        MainPage.getInformationUser(idUser)
        .then((data) => {
            setLoad(true) ; 
            setInformation(data.data) ; 
        })
        .catch((error) => {
            
        })
    }

    return(
        <section className="info">
            {load ? 
            <article>
                <img className="info-banner" src="../../image/banner-small.jpg" alt="..." />
                <Avatar className="info-avatar" alt={information.name} src={information.photo} />
                <h1>{information.name} {information.surname}</h1>
                <p>{information.description}</p>
            </article>
            : 
            <article>
                <Skeleton variant="text" />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={210} height={118} />
            </article>
            }
        </section>
    )
}