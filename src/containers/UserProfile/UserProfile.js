
import React, {useEffect, useState, useContext, Suspense} from "react";
import {Switch, Route, Prompt, Redirect} from 'react-router';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import {ViewAsContext} from "../../context/view-as-context";

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

const GuardRoute = React.lazy(() => {
    return import('../../components/UI/Modal/GuardRouteModals/GuardRouteModal')
})

const userProfile = (props) => {

    const viewAsContext = useContext(ViewAsContext)
    const [pathRoot, setPathRoot] = useState(props.history.location.pathname.split("/")[1])
    const [displayProfile, setDisplayProfile] = useState(props.match.params.id)
    const [viewAsFlag, setViewAsFlag] = useState(props.history.location.pathname.split("/")[props.history.location.pathname.split("/").length - 1])
    const [reqPermission, setReqPermission] = useState(null);


    const viewAsPermittedPaths = [
        `/${pathRoot}/${displayProfile}/view-as`,
        `/${pathRoot}/${displayProfile}/about/view-as`,
        `/${pathRoot}/${displayProfile}/friends/view-as`,
        `/${pathRoot}/${displayProfile}/photos/view-as`
    ]

    const {otherProfile, myPublicProfileKey} = props

    useEffect(() => {
        if (viewAsContext.viewingAs) {
            window.onbeforeunload = () => {
                return "Would you like to exit view-as mode?";
            }
        } else {
            window.onbeforeunload = null;
        }

    }, [viewAsContext.viewingAs])

    useEffect(() => {
        return () => {
            if (viewAsContext.viewingAs) {
                viewAsContext.closeModal()
                window.onbeforeunload = null;
            }
        }
    }, [])


    useEffect(() => {
        if (displayProfile !== 'me') {
            if (displayProfile === props.firebaseKey && viewAsFlag !== 'view-as' && !viewAsContext.viewingAs && viewAsPermittedPaths.find(path => path === props.history.location.pathname)) {
                props.history.replace('/user-profile/me')
            }
        }
    })

    useEffect(() => {
        if (displayProfile !== props.match.params.id) {
            setDisplayProfile(props.match.params.id)
        }
        if (viewAsFlag !== props.history.location.pathname.split("/")[props.history.location.pathname.split("/").length - 1]) {
            setViewAsFlag(props.history.location.pathname.split("/")[props.history.location.pathname.split("/").length - 1])
        }
    })

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

    let viewAsRedirect;
    if (!viewAsContext.viewingAs && viewAsFlag === props.history.location.pathname.split("/")[props.history.location.pathname.split("/").length - 1] && viewAsFlag === 'view-as' && viewAsPermittedPaths.find(path => path === props.history.location.pathname)) {
        viewAsRedirect = <Redirect to="/user-profile/me"/>
    }

    const endViewingAs = () => {
        viewAsContext.closeModal()
    }


    let profile = (
        <React.Fragment>
            <GuardRoute
                when={viewAsContext.allowNav !== true && viewAsContext.viewingAs && viewAsFlag === props.history.location.pathname.split("/")[props.history.location.pathname.split("/").length - 1] && viewAsFlag === 'view-as'}
                navigate={path => props.history.push(path)}
                shouldBlock={location => {
                    if (!viewAsPermittedPaths.includes(location)) {
                        return true
                    }
                    return false
                }}
                cleanUp={endViewingAs}
                allowNav={viewAsContext.allowNav}
                caption={"Leaving this page will exit View-As mode..."}
                permittedPaths={viewAsPermittedPaths}
            />
            {viewAsRedirect}
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
                      <Route exact path={viewAsContext.viewingAs ? `/${pathRoot}/:id/${viewAsFlag}` :`/${pathRoot}/:id`} render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                            <Timeline pathRoot={pathRoot} displayProfile={displayProfile} />
                          </Suspense>
                      )}/>
                      <Route path={viewAsContext.viewingAs ? `/${pathRoot}/:id/about/${viewAsFlag}` : `/${pathRoot}/:id/about` } render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                            <ProfileAbout pathRoot={pathRoot} displayProfile={displayProfile}/>
                          </Suspense>
                      )} />
                      <Route path={viewAsContext.viewingAs ? `/${pathRoot}/:id/friends/${viewAsFlag}` : `/${pathRoot}/:id/friends`} render={(props) => (
                          <Suspense fallback={<SquareFold />}>
                             <Friends pathRoot={pathRoot} displayProfile={displayProfile}/>
                          </Suspense>
                      )} />
                      <Route path={viewAsContext.viewingAs ? `/${pathRoot}/:id/photos/${viewAsFlag}` : `/${pathRoot}/:id/photos`} render={(props) => (
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
