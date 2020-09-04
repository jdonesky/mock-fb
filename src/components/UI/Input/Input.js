import React from "react";
import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          value={props.value}
          type={props.type}
          invalid={!props.valid}
          touched={props.touched}
          placeholder={props.placeholder}
          onChange={props.changed}
          className={inputClasses.join(" ")}
        />
      );
      break;

    default:
      inputElement = null;
  }

  return (
    <div className={classes.Input}>
      {/* <label className={classes.Label}>{props.label || null}</label> */}
      {inputElement}
    </div>
  );
};

export default input;
