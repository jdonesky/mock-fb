import React from "react";
import classes from "./Input.css";

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
          className={classes.InputElement}
        />
      );
      break;

    default:
      inputElement = null;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label || null}</label>
      {inputElement}
    </div>
  );
};

export default input;
