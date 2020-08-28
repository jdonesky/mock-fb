import React from "react";

const backdrop = (props) =>
  props.show ? (
    <div className={classes.Backdrop} close={props.modalClose}></div>
  ) : null;

export default backdrop;
