import React from "react";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.css'

const layout = (props) => {
  return (
    <React.Fragment>
      <Toolbar />
      <div className={classes.Content}>
      {props.children}
      </div>
    </React.Fragment>
  );
};

export default layout;
