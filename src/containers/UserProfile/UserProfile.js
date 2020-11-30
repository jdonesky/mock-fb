import React, {useEffect, Suspense} from "react";
import {Switch, Route} from 'react-router';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import withErrorHandler from "../../hoc/withErrorHandler";
import ProfilePics from '../../components/Profile/ProfilePics/ProfilePics';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import NavigationBar from '../../components/Profile/NavigationBar/NavigationBar';
import Timeline from '../../components/Profile/Timeline/Timeline';
import DeleteModal from "../../components/UI/Modal/DeleteModal";
import LifeEventModal from '../../components/UI/Modal/LifeEventModals/LifeEventModal';
import CreatePostModal from '../../components/UI/Modal/CreatePostModals/CreatePost';

import axios from '../../axios/db-axios-instance';
import classes from "./UserProfile.css";
import SquareFold from "../../components/UI/Spinner/SquareFold";

const ProfileAbout = React.lazy(() => {
  return import('../../components/Profile/ProfileAbout/ProfileAbout')
})


const userProfile = (props) => {

    const {onFetchProfile, userId, authToken} = props

    useEffect(() => {
        // onFetchProfile(userId, authToken);
    }, [onFetchProfile,userId,authToken])


    let profile = (
        <React.Fragment>
          <LifeEventModal />
          <DeleteModal />
          <CreatePostModal />
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
                      <Route exact path="/user-profile" render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                            <Timeline {...props}/>
                          </Suspense>
                      )}/>
                      <Route path="/user-profile/about" render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                            <ProfileAbout {...props}/>
                          </Suspense>
                      )} />
                    </Switch>
                  </div>
              </div>
              <div className={classes.Footer}/>
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
    onFetchProfile: (userId, authToken) => dispatch(actions.fetchProfileAttempt(userId, authToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(userProfile, axios));
