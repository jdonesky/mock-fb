import React from "react";
import {withRouter} from 'react-router-dom'
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../UI/Logo/Logo";

import classes from "./Toolbar.css";

const toolbar = (props) => {

  return (
    <header className={classes.Toolbar}>
      <div onClick={() => props.history.push('/')} className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default withRouter(toolbar);
