import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
      <NavigationItem link="/search-users" style={{width: "100px"}}>
        <FontAwesomeIcon icon={faSearch} style={{margin: "2px 10px 0 10px"}}/>
      </NavigationItem>
      <NavigationItem exact link="/">Home</NavigationItem>
      {/*<NavigationItem link="/friends">Friends</NavigationItem>*/}
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
export default connect(mapStateToProps)(withRouter(navigationItems));
