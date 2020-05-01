import React from "react" ; 
import "./style/spinner-style.scss" ; 

export default function SpinnerAnimation(){
    return(
        <div className="container">
            <div className="spinner spinner-one"></div>
            <div className="spinner spinner-two"></div>
            <div className="spinner spinner-three"></div>
            <div className="spinner spinner-four"></div>
        </div>
    )
}