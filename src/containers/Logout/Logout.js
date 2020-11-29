import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

const Logout = (props) => {
  useEffect(() => {
    props.onLogout();
    props.onClearProfileFromStore();
  }, [])

  return <Redirect to="/authentication" />;

}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.authLogout()),
    onClearProfileFromStore: () => dispatch(actions.clearProfile())
  };
};

export default connect(null,mapDispatchToProps)(Logout);
