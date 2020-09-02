import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
    this.props.onClearProfileFromStore();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.authLogout()),
    onClearProfileFromStore: () => dispatch(actions.clearProfile())
  };
};

export default connect(null,mapDispatchToProps)(Logout);
