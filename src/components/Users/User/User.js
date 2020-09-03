import React from "react";
import classes from "./User.css";

const user = (props) => {
  return (
    <div className={classes.User}>
      <div className={classes.ImageContainer}>
        <img src={props.userImage} />
      </div>
    </div>
  );
};

export default user;
