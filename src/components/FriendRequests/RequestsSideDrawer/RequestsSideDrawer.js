

import React, {useEffect, useState} from 'react';
import classes from './RequestsSideDrawer.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Request from '../Request/Request';

import Gear from '../../../assets/images/TopNavButtonIcons/gear';

const requestsSideDrawer = props => {

    const {myFriends, onFetchMyFriendRequests, onFetchMyFriends, onFetchManyProfiles, authToken, myPublicProfileKey, receivedRequests, sentRequests, manyProfiles} = props

    useEffect(() => {
        onFetchMyFriendRequests(authToken, myPublicProfileKey);
        onFetchMyFriends(authToken, myPublicProfileKey);
    }, [myFriends, onFetchMyFriendRequests, onFetchMyFriends, authToken, myPublicProfileKey])

    useEffect(() => {
        let combinedKeys = []
        if (receivedRequests && receivedRequests.length) {
            receivedRequests.forEach(req => {
                combinedKeys.push(req.publicProfileKey)
            })
        }
        if (sentRequests && sentRequests.length) {
            sentRequests.forEach(req => {
                combinedKeys.push(req.publicProfileKey)
            })
        }
        // console.log('keys to fetch', combinedKeys);
        if (combinedKeys && combinedKeys.length) {
            onFetchManyProfiles(authToken, combinedKeys)
        }
    }, [receivedRequests, sentRequests, onFetchManyProfiles, authToken])

    // useEffect(() => {
    //     console.log('My sent requests', sentRequests);
    //     console.log('My received requests', receivedRequests);
    //     console.log('ManyProfiles ', props.manyProfiles)
    // })

    const [seeingAll, setSeeingAll] = useState(true);

    let requestsCount = props.receivedRequests && props.receivedRequests.length ? props.receivedRequests.length : 0
    let paths;
    let viewSentButton;
    if (seeingAll) {
        paths = <div className={classes.Paths}><div className={classes.Path} onClick={() => setSeeingAll(false)}>Friends</div><span> &rsaquo;</span><div className={classes.Path}>Friend Requests</div></div>
        viewSentButton = <div className={classes.ViewSent}>View Sent Requests</div>
    }

    let receivedRequestsList;
    if (receivedRequests && receivedRequests.length) {
        if (props.manyProfiles && props.manyProfiles.length) {
            receivedRequestsList = receivedRequests.map( req => {
                const profile = props.manyProfiles.find(profile => profile.publicProfileKey === req.publicProfileKey)
                let profileImage;
                if (profile) {
                    profileImage = profile.profileImage;
                }
                console.log(profileImage)
                if (profileImage) {
                    return {...req, profileImage: profileImage}
                } else {
                    return req;
                }
            })

            receivedRequestsList = props.receivedRequests.map( req => (
                <Request
                    profileImage={req.profileImage}
                    name={req.name}
                    mutualFriends={req.mutualFriends}

                />
            ))
        }
    }

    let sentRequestsList;
    if (seeingAll) {
        if (sentRequests && sentRequests.length) {
            if (props.manyProfiles && props.manyProfiles.length) {
                sentRequestsList = sentRequests.map( req => {
                    const profile = manyProfiles.find(profile => profile.userKey === req.userKey)
                    let profileImage;
                    if(profile) {
                        profileImage = profile.profileImage
                    }
                    if (profileImage) {
                        return {...req, profileImage: profileImage}
                    } else {
                        return req
                    }
                })

                sentRequestsList = props.sentRequests.map( req => (
                    <Request

                    />
                ))
            }
        }
    }

    return (
        <div className={classes.SideDrawerContainer}>
            {paths}
            <section className={classes.Header} style={{top: seeingAll ? '85px' : null, height: seeingAll ? "40px" : null}}>
                <h1 className={classes.HeaderTitle}>Friends</h1>
                <div className={classes.SettingsIconContainer}><Gear /></div>
            </section>
            <div className={classes.Break}/>
            <section className={classes.ReceivedRequestsContainer}>
                <div className={classes.RequestsHeader}>
                    <span className={classes.RequestsCount}>{`${requestsCount} Friend Requests`}</span>
                    <div className={classes.SeeAllButton} onClick={() => setSeeingAll(true)}>See All</div>
                </div>
                {viewSentButton}

            </section>


        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        myPublicProfileKey: state.profile.publicProfileKey,
        receivedRequests: state.friends.receivedRequests,
        sentRequests: state.friends.sentRequests,
        myFriends: state.friends.friends,
        manyProfiles: state.users.manyProfiles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMyFriendRequests: (authToken, publicProfileKey) => dispatch(actions.fetchFriendRequestsAttempt(authToken, publicProfileKey)),
        onFetchMyFriends: (authToken, publicProfileKey) => dispatch(actions.fetchFriendRequestsAttempt(authToken, publicProfileKey)),
        onFetchManyProfiles: (authToken, publicProfileKeys) => dispatch(actions.fetchManyPublicProfilesAttempt(authToken, publicProfileKeys))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(requestsSideDrawer);