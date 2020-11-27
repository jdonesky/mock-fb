import React from "react";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.css'

const layout = (props) => {
  return (
    <div className={classes.Container}>
      <Toolbar />
      <div className={classes.Content}>
        {props.children}
      </div>
      {/*<div className={classes.Break}/>*/}
      {/*<div className={classes.ProfileContentBackdrop} />*/}
    </div>
  );
};

export default layout;
