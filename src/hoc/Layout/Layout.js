import React from "react";
import {connect} from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import TopNavBar from '../../components/Navigation/TopNavigation/TopNavigation';
import classes from './Layout.css';

const layout = (props) => {

  let navigation;
  if (props.token) {
      navigation = <TopNavBar />
  }
  return (
    <div className={classes.Container}>
      {navigation}
      <div className={classes.Content}>
        {props.children}
      </div>
      <div className={classes.ContentBackdrop}/>
    </div>
  );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(layout);
