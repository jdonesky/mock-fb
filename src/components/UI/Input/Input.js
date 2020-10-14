import React from "react";
import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  //
  // if (props.options) {
  //   console.log(props.options.map(option => {
  //     return <option value={option.value}>{option.label}</option>
  //   }))
  // }

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
          <select value={props.value} onChange={props.changed}>
            {props.options? props.options.map(option => {
              return <option key={option.value} value={option.value}>{option.label}</option>
            }) : null}
          </select>
      );
      break;
    default:
      inputElement = null;
  };

  let customInput = inputElement

  if (props.elementType === 'checkbox') {
    customInput = (
        <div className={classes.CheckContainer}>
            <div className={classes.CheckCircle}>
              {inputElement}
            </div>
            <label className={classes.CheckLabel} htmlFor={props.placeholder}>{props.label || null}</label>
        </div>
    );
  }

  if (props.elementType === 'select') {
    customInput = (
        <div className={classes.SelectContainer}>
          <label>
            {props.label}
            {inputElement}
          </label>
        </div>
    )
  }

  return customInput;
};

export default input;
