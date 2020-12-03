import React from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {

  const containerClasses = [classes.ModalContainer];;
  if (props.addClass) {
      containerClasses.push(props.addClass);
  }

  const modalClasses = [classes.Modal];
  if (props.className) {
      modalClasses.push(props.className)
  }

  return (
    <React.Fragment>
      <div className={containerClasses.join(" ")}>
          <div
            className={modalClasses.join(" ")}
            style={{
              transform: props.show ? "translateY(0)" : "translateY(-300vh)",
              opacity: props.show ? "1" : "0",
            }}
            show={props.show}
            onClick={props.type === 'error' ? props.close : null}
          >
            {props.children}
          </div>
      <Backdrop show={props.show} close={props.close} backdropClass={props.backdropClass}/>
    </div>
    </React.Fragment>
  );
};

export default React.memo(modal);
