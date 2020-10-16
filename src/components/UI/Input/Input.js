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
          <select value={props.value} onChange={props.changed} className={inputClasses.join(' ')}>
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
        <React.Fragment>
          {props.extra === 'start' && <h4 style={{margin: '10px 0 0 0'}}>{props.header}</h4>}
          <div className={classes.SelectContainer}>
              {inputElement}
              {props.extra === 'break' && <span style={{marginLeft: '10px', marginRight:'5px'}}>to</span>}
          </div>
        </React.Fragment>
    )
  }

  return customInput;
};

export default input;
