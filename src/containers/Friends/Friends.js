import React, {useEffect, useRef} from "react";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Friends.css';
import RequestsSideDrawer from "../../components/FriendRequests/RequestsSideDrawer/RequestsSideDrawer";

const friends = props => {


    let myFriendRequests;
    if (props.myPublicProfile) {
        myFriendRequests = props.myPublicProfile.friendRequests;
    }

    return (
      <div className={classes.FriendsPage}>
        <RequestsSideDrawer friendRequests={myFriendRequests} />
      </div>
    );

}

const mapStateToProps = state => {
  return {
    myPublicProfile: state.profile.publicProfile,
    myPublicProfileKey: state.profile.publicProfileKey,
    authToken: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onFetchMyPublicProfile: (authToken, publicProfileKey) => dispatch(actions.fetchMyPublicProfileAttempt(authToken, publicProfileKey)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(friends);
