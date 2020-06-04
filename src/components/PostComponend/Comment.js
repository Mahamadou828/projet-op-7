import React , {useState} from "react" ; 
import PropTypes from "prop-types" ; 
import { GET_COMMENT, SEND_COMMENT } from "../../RequestRoute";
import SpinnerAnimation from "../Loader";
import { TextField, Button } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import ramdomNumber from "../../function/ramdomNumber" ; 
import MinimizeIcon from '@material-ui/icons/Minimize';
import VerifyInput from "../../function/verifyInput" ; 
import MainPage from "../MainPage";

export default function Comment(props) {

    const [loadComment , setLoadComment] = useState(false) ; 
    const [commentList , setCommentList] = useState([]) ; 
    const [comment , setComment] = useState("") ; 
    const [submit , setSubmit] = useState(true) ;
    const [userData , setUserData] = useState({}) ;
    
    if (!loadComment) {
        const url = `${GET_COMMENT}${props.id_post}` ; 

        const myInit= {
            method: "GET" , 
            mode: "cors" , 
            cache: "default"
        }

        fetch(url , myInit)
        .then((respond) => {
            respond.json()
            .then((data) => {
                if(data.access){
                    setCommentList(data.data) ; 
                    setLoadComment(true) ; 
                    const request = MainPage.getInformationUser(props.id_user) ; 
                    request
                    .then((data) => {
                        if(data.success) {
                            setUserData({
                                name: data.data.name , 
                                surname: data.data.surname ,
                                photo: data.data.photo
                            }) ; 
                        }
                    })
                    .catch((error) => {
                
                    })       
                }
            })
            .catch((error) => {

            })
        })
        .catch((error) => {

        })
    }

    const displayComment = (commentToShow) => {
        if(commentToShow.length === 0) {
            return <p>You are the first who comment 😍</p>
        } else {
            return commentToShow.map((row) => (
                <article className="comment-part" key={ramdomNumber()}>
                    <Avatar alt="..." src={row.photo} className="comment-part-avatar" />
                    <section className="comment-part-text">
                        <article className="comment-part-text-detail">
                            <h4>{row.name} {row.surname}</h4>
                            <MinimizeIcon className="minimiIcon" />
                            <h4>{row.date.split("T")[0]}</h4>
                        </article>
                        <p>{row.comment}</p>

                    </section>
                </article>
                
            ))
        }
    }

    const writeComment = (value) => {
        if(VerifyInput(value , 4)){
            setComment(value) ;
            setSubmit(true) ; 
        } else {
            setSubmit(false) ;
        }
    }

    const sendComment = () => {
        if(submit) {
            const url = SEND_COMMENT; 
            const data = {
                comment: comment , 
                id_post: props.id_post , 
                id_user: props.id_user
            }          
            const myInit = {
                method: "POST" , 
                body: JSON.stringify(data) , 
                headers: {
                    "Content-Type":"application/json"
                } ,
                mode: "cors" , 
                cache: "default"
            }

            fetch(url , myInit)
            .then((respondJSON) => {
                respondJSON.json()
                .then((respond) => {
                    if(respond.success) 
                    { 
                        document.querySelector("#Comment").value = " " ; 
                        const yourComment = {
                            photo: userData.photo , 
                            comment: comment ,
                            name: userData.name , 
                            surname: userData.surname , 
                            date: getDate()
                        }
                        commentList.unshift(yourComment) ; 
                        setSubmit(false) ; 
                    }
                })
                .catch((error) => {

                })
            })
            .catch((error) => {

            })
        }
    }

    return(
        <article>
            {loadComment ? 
            <section className="comment">
                <TextField
                id="Comment"
                label="Your Comment"
                placeholder="Placeholder"
                multiline
                className="comment-input"
                onChange={(e) => writeComment(e.target.value)}
                />
                <Button 
                variant="outlined" 
                color="primary" 
                className="comment-button"
                onClick={() => sendComment()}
                >
                Post
                </Button>

                {displayComment(commentList)}
            </section>
             : <SpinnerAnimation />}
        </article>
    )
}

function getDate() {
    return new Date().toISOString() ; 
}

Comment.propTypes = {
    id_user: PropTypes.string.isRequired , 
    id_post: PropTypes.number.isRequired , 
}