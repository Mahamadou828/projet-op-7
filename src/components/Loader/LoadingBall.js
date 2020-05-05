import React from "react" ; 
import "./style/loading-ball-style.scss" ; 

export default function LoadingBall() {
    return(
        <div className="wrap">
            <div className="loading">
                <div className="bounceball"></div>
                <div className="text">NOW LOADING</div>
            </div>
        </div>
    ) ;
}