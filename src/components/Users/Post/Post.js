import React from "react";
import classes from "./Post.css";

const post = (props) => (
  <div className={classes.Post}>
    <div className={classes.ProfilePic}>
      <img src={props.profilePic} alt='user pic'/>
    </div>
    <div className={classes.Status}>
      <p>{props.status}</p>
      <div className={classes.Datetime}>
        <p>{props.dateTime}</p>
      </div>
    </div>
    <div>LIKE COMMENT</div>
  </div>
);

export default post;
