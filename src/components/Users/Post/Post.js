import React from "react";
import classes from "./Post.css";
const post = (props) => (
  <div className={classes.Post}>
    <div className={classes.ProfilePic}>Pic</div>
    <div className={classes.Status}>
      <p>status</p>
      <p>date/time</p>
    </div>
    <div>LIKE COMMENT</div>
  </div>
);

export default post;
