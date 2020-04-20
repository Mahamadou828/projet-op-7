import React from "react" ; 
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types" ; 

export default function Snackbar(props){
  
  return(
    <div className="snackbar">
      <p>{props.text}</p>
      {props.addButton ? <Button className="snackbar-additionnalbutton" onClick={() => props.func()}>{props.textButton}</Button> : null}
      <Button onClick={() => props.close()}>
        <HighlightOffIcon />
      </Button>
    </div>
  ) ; 

}

Snackbar.propTypes = {
  text: PropTypes.string.isRequired , 
  close: PropTypes.func.isRequired , 
  func: PropTypes.func , 
  textButton: PropTypes.string , 
  addButton: PropTypes.bool.isRequired
}