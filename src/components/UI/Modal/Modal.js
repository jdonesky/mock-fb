import React from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {

  const containerClasses = [classes.ModalContainer]
  if (props.addClass) {
      containerClasses.push(props.addClass)
  }

  return (
    <React.Fragment>
      <div className={containerClasses.join(" ")}>
          <div
            className={classes.Modal}
            style={{
              transform: props.show ? "translateY(0)" : "translateY(-300vh)",
              opacity: props.show ? "1" : "0",
            }}
            show={props.show}
            onClick={props.type === 'error' ? props.close : null}
          >
            {props.children}
          </div>
      <Backdrop show={props.show} close={props.close}/>
    </div>
    </React.Fragment>
  );
};

export default React.memo(modal);
