import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Home</NavigationItem>
      <NavigationItem link="/activity-feed">Feed</NavigationItem>
      <NavigationItem linke="/user-profile">Profile</NavigationItem>
    </ul>
  );
};

export default navigationItems;
