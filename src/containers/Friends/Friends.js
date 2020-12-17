import React, { Component } from "react";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Friends.css';
import RequestsSideDrawer from "../../components/FriendRequests/RequestsSideDrawer/RequestsSideDrawer";

const friends = prop => {

    return (
      <div className={classes.FriendsPage}>
        <RequestsSideDrawer />
      </div>
    );

}


const mapStateToProps = state => {
  return {

    authToken: state.auth.token,
    friends: state.friends.friends,
    loading: state.friends.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onFetchFriends : (userId, authToken) => dispatch(actions.fetchFriendsAttempt(userId,authToken))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(friends);
