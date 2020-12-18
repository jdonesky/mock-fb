

import React, {useEffect, useState} from 'react';
import classes from './RequestsSideDrawer.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Request from '../Request/Request';

import Gear from '../../../assets/images/TopNavButtonIcons/gear';

const requestsSideDrawer = props => {

    const {myFriends, onFetchMyFriendRequests, onFetchMyFriends, onFetchManyProfiles, authToken, myPublicProfileKey, receivedRequests, sentRequests, manyProfiles} = props
    const [seeingAll, setSeeingAll] = useState(true);

    useEffect(() => {
        onFetchMyFriendRequests(authToken, myPublicProfileKey);
    }, [onFetchMyFriendRequests, authToken, myPublicProfileKey])

    useEffect(() => {
        if (myPublicProfileKey) {
            onFetchMyFriends(authToken, myPublicProfileKey);
        }
    }, [])

    useEffect(() => {
        console.log('myFriends', myFriends)
    })

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
        if (combinedKeys && combinedKeys.length) {
            onFetchManyProfiles(authToken, combinedKeys)
        }
    }, [receivedRequests, sentRequests, onFetchManyProfiles, authToken])

    const acceptRequest = (senderKey) => {
        props.onAcceptFriendRequest(authToken, senderKey, myPublicProfileKey)
    }

    const denyRequest = (senderKey) => {
        props.onDenyFriendRequest(authToken, senderKey, myPublicProfileKey)
    }

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
                const profile = props.manyProfiles.find(profile => profile.userKey === req.userKey)
                let profileImage;
                let mutualFriends;
                if (profile) {
                    profileImage = profile.profileImage;
                    if (profile.friends && myFriends) {
                        mutualFriends = profile.friends.map(theirFriend => myFriends.map(myFriend => myFriend.userKey).includes(theirFriend.userKey))
                        console.log('mutualFriends', mutualFriends)
                    }
                }

                return {...req, profileImage: profileImage, mutualFriends: mutualFriends}

            })
            console.log('receivedRequestList', receivedRequestsList)
            receivedRequestsList = receivedRequestsList.map( req => (
                <Request
                    key={req.userKey}
                    profileImage={req.profileImage}
                    name={req.name}
                    mutualFriends={req.mutualFriends}
                    userKey={req.userKey}
                    publicProfileKey={req.publicProfileKey}
                    acceptReq={acceptRequest}
                    denyReq={denyRequest}
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
                        key={req.userKey}
                        profileImage={req.profileImage}
                        name={req.name}
                        mutualFriends={req.mutualFriends}
                        userKey={req.userKey}
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
                {receivedRequestsList}
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
        onFetchMyFriends: (authToken, publicProfileKey) => dispatch(actions.fetchFriendsAttempt(authToken, publicProfileKey)),
        onFetchManyProfiles: (authToken, publicProfileKeys) => dispatch(actions.fetchManyPublicProfilesAttempt(authToken, publicProfileKeys)),
        onAcceptRequest: (authToken, senderKey, recipientKey) => dispatch(actions.acceptFriendRequestAttempt(authToken, senderKey, recipientKey)),
        onDenyRequest: (authToken, senderKey, recipientKey) => dispatch(actions.denyFriendRequestAttempt(authToken, senderKey, recipientKey)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(requestsSideDrawer);