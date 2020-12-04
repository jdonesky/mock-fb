import React, {useEffect} from "react";
import classes from "./Backdrop.css";

const backdrop = (props) => {

  let backdropClasses = [classes.Backdrop]
  if (props.backdropClass) {
    backdropClasses.push(props.backdropClass)
  }


  let backdrop;
  if (props.show) {
    backdrop = <div className={backdropClasses.join(" ")} onClick={props.close}></div>
  } else {
    backdrop = null;
  }

  return backdrop;
}


export default backdrop;
