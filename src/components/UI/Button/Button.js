import React from "react";
import classes from "./Button.css";

const button = (props) => {
  const buttonClass = [classes.Button];
  if (props.addClass) {
    buttonClass.push(classes[props.addClass]);
  }
  if (props.disabled) {
      buttonClass.push(classes.Disabled)
  }
  if (props.type === 'privacy') {
    buttonClass.push(classes.Privacy)
  }

  if (props.className) {
    buttonClass.push(props.className)
  }

  return (
      <button
      type={props.type}
      className={buttonClass.join(" ")} 
      onClick={props.clicked}
      disabled={props.disabled}
      >
        {props.children}
      </button>
  );
};

export default button;
