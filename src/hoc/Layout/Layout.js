import React from "react";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import TopNavBar from '../../components/Navigation/TopNavigation/TopNavigation'
import classes from './Layout.css'

const layout = (props) => {
  return (
    <div className={classes.Container}>
      <TopNavBar />
      {/*<Toolbar />*/}
      <div className={classes.Content}>
        {props.children}
      </div>
    </div>
  );
};

export default layout;
