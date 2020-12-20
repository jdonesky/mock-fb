import React, {useEffect} from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import TopNavBar from '../../components/Navigation/TopNavigation/TopNavigation';
import classes from './Layout.css';

const layout = (props) => {

  const pathRoot = props.history.location.pathname.split('/')[1];
  const id = props.history.location.pathname.split('/')[2];

  useEffect(() => {
      console.log(id);
  })


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
      <div className={classes.ContentBackdrop} style={{backgroundColor: pathRoot === 'friends' && id !== undefined ? 'transparent' : null}}/>
    </div>
  );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(withRouter(layout));
