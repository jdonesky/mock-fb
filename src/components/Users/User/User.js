import React from "react";
import classes from "./User.css";

const user = (props) => {
  return (
    <div className={classes.User} onClick={props.clicked}>
      <div className={classes.ImageContainer}>
        <img src={props.userImage} alt="user pic" />
      </div>
      <div>
          <p>{props.name}</p>
      </div>
    </div>
  );
};

export default user;
