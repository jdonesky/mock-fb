import React from "react";
import { connect } from "react-redux";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const navigationItems = (props) => {
  const defaultRoutes = (
    <ul className={classes.NavigationItems}>
      <NavigationItem exact link="/">
        Home
      </NavigationItem>
      <NavigationItem link="/authentication">Sign In</NavigationItem>
    </ul>
  );
  const authenticatedRoutes = (
    <ul className={classes.NavigationItems}>
      <NavigationItem exact link="/">
        Home
      </NavigationItem>
      <i class="fas fa-search"></i>

      <NavigationItem link="/friends">Friends</NavigationItem>
      <NavigationItem link="/user-profile">Profile</NavigationItem>
      <NavigationItem link="/logout">Sign Out</NavigationItem>
    </ul>
  );
  return props.isAuthenticated ? authenticatedRoutes : defaultRoutes;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(navigationItems);
