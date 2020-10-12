import React, { useState, useReducer, useRef, useEffect, Suspense } from "react";
import {Switch, Route} from 'react-router'
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler";
import ProfilePics from '../../components/Profile/ProfilePics/ProfilePics'
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader'
import axios from '../../axios/db-axios-instance'
import classes from "./UserProfile.css";

const ProfileAbout = React.lazy(() => {
  return import('../../components/Profile/ProfileAbout/ProfileAbout')
})



  const userProfile = (props) => {

    const {onFetchProfile,userId,authToken} = props

    useEffect(() => {
      onFetchProfile(userId, authToken);
    }, [onFetchProfile,userId,authToken])

    return (
        <div className={classes.UserProfile}>
          <ProfilePics />
          <ProfileHeader name={props.name}/>
          <Switch>
            <Route path="/user-profile/about" render={(props) => (
                <Suspense fallback={<h1>...Loading</h1>}>
                  <ProfileAbout {...props}/>
                </Suspense>
            )} />
          </Switch>
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
