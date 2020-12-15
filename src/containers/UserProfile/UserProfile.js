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
        console.log(displayMyProfile);
    })

    let displayProfile;
    if (displayMyProfile) {
        displayProfile = 'my-profile'
    } else {
        displayProfile = 'user-profile'
    }

    let profile = (
        <React.Fragment>
          <div className={classes.UserProfile}>
            <ProfilePics displayMyProfile={displayMyProfile}/>
            <ProfileHeader displayMyProfile={displayMyProfile} name={props.name} bio={props.bio} />
          </div>
          <div className={classes.ScrollableContent}>
              <NavigationBar displayMyProfile={displayMyProfile}/>
              <div className={classes.HeaderBreak}/>
              <div className={classes.ProfileContentBackdrop}>
                  <div className={classes.SwitchContent}>
                    <Switch>
                      <Route exact path={`/${displayProfile}`} render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                            <Timeline displayMyProfile={displayMyProfile}/>
                          </Suspense>
                      )}/>
                      <Route path={`/${displayProfile}/about`} render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                            <ProfileAbout displayMyProfile={displayMyProfile}/>
                          </Suspense>
                      )} />
                      <Route path={`/${displayProfile}/friends`} render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                             <Friends displayMyProfile={displayMyProfile}/>
                          </Suspense>
                      )} />
                      <Route path={`/${displayProfile}/photos`} render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                              <Photos displayMyProfile={displayMyProfile}/>
                          </Suspense>
                      )} />
                    </Switch>
                  </div>
              </div>
          </div>
        </React.Fragment>
    )

    if (props.loadingMyProfile || props.loadingOtherProfile) {
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
    bio: state.profile.bio,
    loadingMyProfile: state.profile.profileLoading,
    loadingOtherProfile: state.users.loadingFullProfile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMyProfile: (userId, authToken) => dispatch(actions.fetchProfileAttempt(userId, authToken)),
    onFetchOtherProfile: (userKey, authToken) => dispatch(actions.fetchFullProfileAttempt(userKey, authToken))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(userProfile, axios));
