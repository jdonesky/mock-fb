import React from "react";
import classes from "./SideDrawer.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const sideDrawer = (props) => {
  return (
    <div className={classes.SideDrawer}>
      <div>LOGO</div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
