import React from "react";
import classes from './Input.css'

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
      <input
      value={props.value}
      invalid={!props.valid}
      touch={props.touched}
      placeholder={props.placeholder}
      onChange={props.changed}
      />
      )
    break;
 
    default:
      inputElement = null;
  }


  return (
      <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
      </div>
   
  )
};

export default input;
