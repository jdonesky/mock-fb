import React, { useState, useReducer, useRef, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler";
import ProfilePics from '../../components/Users/ProfilePics/ProfilePics'
import axios from '../../axios/db-axios-instance'

import classes from "./UserProfile.css";


  const userProfile = (props) => {

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
    profileImage: state.profile.profileImage,
    name: state.profile.name,
    age: state.profile.age,
    location: state.profile.location,
    status: state.profile.status,
    fetched: state.profile.fetched,
    profileLoading: state.profile.profileLoading,
    statusLoading: state.profile.statusLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileSubmit: (userProfile, authToken) =>
      dispatch(actions.updateProfileAttempt(userProfile, authToken)),
    onFetchProfile: (userId, authToken) =>
      dispatch(actions.fetchProfileAttempt(userId, authToken)),
    onStatusUpdate: (authToken, statusInfo) =>
      dispatch(actions.statusUpdateAttempt(authToken, statusInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(userProfile, axios));
