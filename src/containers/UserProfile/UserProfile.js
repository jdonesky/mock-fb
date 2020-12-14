import React, {useEffect, useState, Suspense} from "react";
import {Switch, Route} from 'react-router';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import withErrorHandler from "../../hoc/withErrorHandler";
import ProfilePics from '../../components/Profile/ProfilePics/ProfilePics';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import NavigationBar from '../../components/Profile/NavigationBar/NavigationBar';
import Timeline from '../../components/Profile/Timeline/Timeline';

import axios from '../../axios/db-axios-instance';
import classes from "./UserProfile.css";
import SquareFold from "../../components/UI/Spinner/SquareFold";

const ProfileAbout = React.lazy(() => {
  return import('../../components/Profile/ProfileAbout/ProfileAbout');
})

const Friends = React.lazy(() => {
    return import('../../components/Profile/Friends/Friends');
})

const Photos = React.lazy(() => {
    return import('../../components/Profile/Photos/Photos');
})

const userProfile = (props) => {

    const [displayMyProfile, setDisplayMyProfile] = useState(props.history.location.pathname === '/my-profile')
    useEffect(() => {
        console.log(displayMyProfile)
    }, [])

    let profile = (
        <React.Fragment>
          <div className={classes.UserProfile}>
            <ProfilePics />
            <ProfileHeader name={props.name} bio={props.bio} />
          </div>
          <div className={classes.ScrollableContent}>
              <NavigationBar />
              <div className={classes.HeaderBreak}/>
              <div className={classes.ProfileContentBackdrop}>
                  <div className={classes.SwitchContent}>
                    <Switch>
                      <Route exact path="/my-profile" render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                            <Timeline {...props}/>
                          </Suspense>
                      )}/>
                      <Route path="/my-profile/about" render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                            <ProfileAbout {...props}/>
                          </Suspense>
                      )} />
                      <Route path="/my-profile/friends" render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                             <Friends {...props}/>
                          </Suspense>
                      )} />
                      <Route path="/my-profile/photos" render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                              <Photos {...props}/>
                          </Suspense>
                      )} />
                    </Switch>
                  </div>
              </div>
          </div>
        </React.Fragment>
    )

    if (props.profileLoading) {
      profile = <SquareFold />
    }

    return profile;
}


const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    authToken: state.auth.token,
    firebaseKey: state.profile.firebaseKey,
    name: state.profile.firstName + ' ' + state.profile.lastName,
    birthday: state.profile.birthday,
    location: state.profile.location,
    bio: state.profile.bio,
    profileLoading: state.profile.profileLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMyProfile: (userId, authToken) => dispatch(actions.fetchProfileAttempt(userId, authToken)),
    onFetchOtherProfile: (userKey, authToken) => dispatch(actions.fetchFullProfileAttempt(userKey, authToken))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(userProfile, axios));
