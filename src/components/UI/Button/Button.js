import React from "react";
import classes from "./Button.css";

const button = (props) => {
  const buttonClass = [classes.Button];
  if (props.addClass) {
    buttonClass.push(classes[props.addClass]);
  }
  return (
    <div>
      <button
      className={buttonClass.join(" ")} 
      onClick={props.clicked}
      disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  );
};

export default button;
