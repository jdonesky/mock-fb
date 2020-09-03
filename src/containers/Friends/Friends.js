import React, { Component } from "react";
import {connect} from 'react-redux'

import * as actions from '../../store/actions/index'


class Friends extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <ul>
          <div>USERS</div>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    usersLoading: state.users.usersLoading,
    clickProcessing: state.users.clickProcessing,
    error: state.users.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMessageSent: (message) => dispatch(),
    onUnfriend: () => dispatch()
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Friends);
