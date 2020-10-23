import React from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  return (
    <React.Fragment>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
        show={props.show}
        onClick={props.type === 'error' ? props.close : null}
      >
        {props.children}
      </div>
      <Backdrop show={props.show} close={props.close}/>
    </React.Fragment>
  );
};

export default React.memo(modal);
