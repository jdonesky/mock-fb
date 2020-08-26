import React from "react";


const input = (props) => {
  let inputElement = null;

  switch (props.inputType) {
    case "input":
      inputElement = <input value={props.value} config={...props.config}/>;
    
    default:
      inputElement = null;
  }


  return (
      <div className={classes.InputElement}>
          <label>{props.label}</label>
        {inputElement}
      </div>
   
  )
};

export default input;
