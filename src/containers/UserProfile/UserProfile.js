import React, { useState, useReducer, useRef, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler";
import ProfilePics from '../../components/Profile/ProfilePics/ProfilePics'
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader'
import ProfileAbout from '../../components/Profile/ProfileAbout/ProfileAbout'
import axios from '../../axios/db-axios-instance'

import classes from "./UserProfile.css";


  const userProfile = (props) => {

    const {onFetchProfile,userId,authToken} = props

    useEffect(() => {
      onFetchProfile(userId, authToken);
    }, [onFetchProfile,userId,authToken])

    return (
        <div>
          <ProfilePics />
          <ProfileHeader name={props.name}/>
          {/*<ProfileAbout />*/}
        </div>
    )
  }


const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    authToken: state.auth.token,
    key: state.profile.firebaseKey,
    name: state.profile.firstName + ' ' + state.profile.lastName,
    birthday: state.profile.birthday,
    location: state.profile.location,
    profileLoading: state.profile.profileLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProfile: (userId, authToken) => dispatch(actions.fetchProfileAttempt(userId, authToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(userProfile, axios));
