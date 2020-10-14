import React from "react";
import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  };

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
    case "textarea":
      inputClasses.push(classes.TextArea);
      inputElement = (
          <textarea
              value={props.value}
              placeholder={props.placeholder}
              onChange={props.changed}
              className={inputClasses.join(" ")}
          />
      );
      break;
    case "checkbox":
      inputClasses.push(classes.Checkbox);
      inputElement = (
        <input
            name={props.placeholder}
            type={props.type}
            value={props.value}
            onChange={props.changed}
            className={inputClasses.join(" ")}
        />
      );
      break;
    case "select":
      inputClasses.push(classes.Select);
      inputElement = (
          <select value={props.value}>
            {props.options.map(option => {
              return <option value={option.value}>{option.label}</option>
            })}
          </select>
      );
      break;
    default:
      inputElement = null;
  };

  let customInput = inputElement

  if (props.elementType === 'checkbox') {
    customInput = (
        <div className={classes.Container}>
            <div className={classes.CheckCircle}>
              {inputElement}
            </div>
            <label className={classes.Label} htmlFor={props.placeholder}>{props.label || null}</label>
        </div>
    );
  }

  return customInput;
};

export default input;
