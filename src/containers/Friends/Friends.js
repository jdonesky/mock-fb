import React, {useEffect} from "react";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Friends.css';
import RequestsSideDrawer from "../../components/FriendRequests/RequestsSideDrawer/RequestsSideDrawer";
import getWindowDimensions from "../../hooks/getWindowDimensions";

const friends = props => {

    const { width, height } = getWindowDimensions()

    useEffect(() => {
        console.log(width);
    })

    let myFriendRequests;
    if (props.myPublicProfile) {
        myFriendRequests = props.myPublicProfile.friendRequests;
    }

    return (
      <div className={classes.FriendsPage} style={{height: height, width: width}}>
        <RequestsSideDrawer friendRequests={myFriendRequests} />
        <div className={classes.ProfileDisplayContainer} style={{height: `${height - 63}px`, width: `${width - 355}px`}}>

        </div>
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
