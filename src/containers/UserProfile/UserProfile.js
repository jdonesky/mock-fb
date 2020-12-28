
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
import getWindowDimensions from "../../hooks/getWindowDimensions";

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

    const [displayProfile, setDisplayProfile] = useState(props.match.params.id)
    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split("/")[1])
    const {otherProfile, myPublicProfileKey} = props

    const {width, height} = getWindowDimensions();

    useEffect(() => {
        if (displayProfile !== 'me') {
            props.onFetchOtherProfile(displayProfile, props.authToken)
        }
    },[displayProfile])

    useEffect(() => {
        if (otherProfile && displayProfile !== 'me') {
            props.onFetchOtherPublicProfile(props.authToken, otherProfile.publicProfileKey)
        }
    }, [otherProfile, displayProfile])

    useEffect(() => {
       if (props.match.params.id === 'me') {
           setDisplayProfile('me')
       } else {
           setDisplayProfile(props.match.params.id)
       }
    }, [props.match.params.id])

    let name;
    let bio;
    if (displayProfile === 'me') {
        name = props.name;
        bio = props.bio;
    } else {
        if (props.otherProfile) {
            name = props.otherProfile.firstName + ' ' + props.otherProfile.lastName
            bio = props.otherProfile.bio
        }
    }

    let profile = (
        <React.Fragment>
          <div className={classes.UserProfile}>
            <ProfilePics displayProfile={displayProfile}/>
            <ProfileHeader displayProfile={displayProfile} name={name} bio={bio} />
          </div>
          <div className={classes.ScrollableContent}>
              <NavigationBar pathRoot={pathRoot} displayProfile={displayProfile}/>
              <div className={classes.HeaderBreak}/>
              <div className={classes.ProfileContentBackdrop}>
                  <div className={classes.SwitchContent}>
                    <Switch>
                      <Route exact path={`/${pathRoot}/:id`} render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                            <Timeline pathRoot={pathRoot} displayProfile={displayProfile} />
                          </Suspense>
                      )}/>
                      <Route path={`/${pathRoot}/:id/about`} render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                            <ProfileAbout pathRoot={pathRoot} displayProfile={displayProfile}/>
                          </Suspense>
                      )} />
                      <Route path={`/${pathRoot}/:id/friends`} render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                             <Friends pathRoot={pathRoot} displayProfile={displayProfile}/>
                          </Suspense>
                      )} />
                      <Route path={`/${pathRoot}/:id/photos`} render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                              <Photos pathRoot={pathRoot} displayProfile={displayProfile}/>
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
    myPublicProfileKey: state.profile.publicProfileKey,
    name: state.profile.firstName + ' ' + state.profile.lastName,
    bio: state.profile.bio,
    loadingMyProfile: state.profile.profileLoading,
    otherProfile: state.users.fullProfile,
    myPublicProfile: state.profile.publicProfile,
    loadingOtherProfile: state.users.loadingFullProfile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMyPublicProfile: (authToken, publicProfileKey) => dispatch(actions.fetchMyPublicProfileAttempt(authToken, publicProfileKey)),
    onFetchOtherProfile: (userKey, authToken) => dispatch(actions.fetchFullProfileAttempt(userKey, authToken)),
    onFetchOtherPublicProfile: (authToken,publicProfileKey) => dispatch(actions.fetchPublicProfileAttempt(authToken,publicProfileKey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(userProfile, axios));
