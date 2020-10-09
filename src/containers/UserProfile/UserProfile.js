import React, { useState, useReducer, useRef, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler";
import ProfilePics from '../../components/Profile/ProfilePics/ProfilePics'
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
        </div>
    )
  }


const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    authToken: state.auth.token,
    key: state.profile.firebaseKey,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
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
