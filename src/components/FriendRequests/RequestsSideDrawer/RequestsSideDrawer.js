

import React, {useEffect, useState, useRef} from 'react';
import classes from './RequestsSideDrawer.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Request from '../Request/Request';
import InlineDots from '../../../components/UI/Spinner/InlineDots';
import Gear from '../../../assets/images/TopNavButtonIcons/gear';


const requestsSideDrawer = props => {

    const {myFriends, onFetchMyFriends, onFetchManyProfiles, authToken, myPublicProfileKey, manyProfiles, friendRequests} = props
    const [seeingAll, setSeeingAll] = useState(true);

    let friendsRef = useRef(null);

    useEffect(() => {
        if (myPublicProfileKey) {
            onFetchMyFriends(authToken, myPublicProfileKey);
        }
        if (props.myPublicProfile) {
            friendsRef.current = props.myPublicProfile.friends
        }
    }, [])

    useEffect(() => {
        if (props.newFriends) {
            friendsRef.current = props.newFriends
        }
    })

    useEffect(() => {
        let combinedKeys = []
        if (friendRequests && friendRequests.received) {
            friendRequests.received.forEach(req => {
                combinedKeys.push(req.publicProfileKey)
            })
        }
        if (friendRequests && friendRequests.sent) {
            friendRequests.sent.forEach(req => {
                combinedKeys.push(req.publicProfileKey)
            })
        }
        if (combinedKeys && combinedKeys.length) {
            onFetchManyProfiles(authToken, combinedKeys)
        }
    }, [friendRequests, onFetchManyProfiles, authToken])

    const acceptRequest = (senderKey) => {
        props.onAcceptRequest(authToken, senderKey, myPublicProfileKey, () => {
            props.onFetchMyFriends(authToken, myPublicProfileKey);
        })
    }

    const denyRequest = (senderKey) => {
        props.onDenyRequest(authToken, senderKey, myPublicProfileKey)
    }

    let requestsCount = friendRequests && friendRequests.received ? friendRequests.received.length : 0

    let paths;
    let viewSentButton;
    if (seeingAll) {
        paths = <div className={classes.Paths}><div className={classes.Path} onClick={() => setSeeingAll(false)}>Friends</div><span> &rsaquo;</span><div className={classes.Path}>Friend Requests</div></div>
        viewSentButton = <div className={classes.ViewSent}>View Sent Requests</div>
    }

    let receivedRequestsList;
    if (friendRequests && friendRequests.received) {
        if (props.manyProfiles && props.manyProfiles.length) {
            receivedRequestsList = friendRequests.received.map( req => {
                const profile = props.manyProfiles.find(profile => profile.userKey === req.userKey)
                let profileImage;
                let mutualFriends;
                if (profile) {
                    profileImage = profile.profileImage;
                    if (profile.friends && myFriends) {
                        mutualFriends = profile.friends.filter(theirFriend => myFriends.map(myFriend => myFriend.userKey).includes(theirFriend.userKey))
                    }
                }
                return {...req, profileImage: profileImage, mutualFriends: mutualFriends}

            })
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
                    myFriends={myFriends}
                    myNewFriends={friendsRef.current}
                />
            ))
        }
    }

    let sentRequestsList;
    if (seeingAll) {
        if (friendRequests && friendRequests.sent) {
            if (props.manyProfiles && props.manyProfiles.length) {
                sentRequestsList = friendRequests.sent.map( req => {
                    const profile = manyProfiles.find(profile => profile.userKey === req.userKey)
                    let profileImage;
                    let mutualFriends;
                    if(profile) {
                        profileImage = profile.profileImage
                        if (profile.friends && myFriends) {
                            mutualFriends = profile.friends.filter(theirFriend => myFriends.map(myFriend => myFriend.userKey).includes(theirFriend.userKey))
                        }
                    }
                    return {...req, profileImage: profileImage, mutualFriends: mutualFriends}
                })

                sentRequestsList = sentRequestsList.map( req => (
                    <Request
                        key={req.userKey}
                        profileImage={req.profileImage}
                        name={req.name}
                        mutualFriends={req.mutualFriends}
                        userKey={req.userKey}
                        publicProfileKey={req.publicProfileKey}
                        acceptReq={acceptRequest}
                        denyReq={denyRequest}
                        myFriends={friendsRef}
                    />
                ))
            }
        }
    }

    let requestsBody = (
        <React.Fragment>
            <div className={classes.RequestsHeader}>
                <span className={classes.RequestsCount}>{`${requestsCount} Friend Requests`}</span>
                <div className={classes.SeeAllButton} onClick={() => setSeeingAll(true)}>See All</div>
            </div>
            {viewSentButton}
            {receivedRequestsList}
        </React.Fragment>
    )

    if (props.fetchingPublicProfile) {
        requestsBody = <InlineDots />
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
                {requestsBody}
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        myPublicProfileKey: state.profile.publicProfileKey,
        myPublicProfile: state.profile.publicProfile,
        fetchingPublicProfile: state.profile.publicProfileLoading,
        fetchingFriends: state.friends.fetchingFriends,
        myFriends: state.profile.publicProfile && state.profile.publicProfile.friends ? state.profile.publicProfile.friends : [],
        newFriends: state.friends.friends,
        manyProfiles: state.users.manyProfiles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMyFriends: (authToken, publicProfileKey) => dispatch(actions.fetchFriendsAttempt(authToken, publicProfileKey)),
        onFetchManyProfiles: (authToken, publicProfileKeys) => dispatch(actions.fetchManyPublicProfilesAttempt(authToken, publicProfileKeys)),
        onAcceptRequest: (authToken, senderKey, recipientKey, cb) => dispatch(actions.acceptFriendRequestAttempt(authToken, senderKey, recipientKey, cb)),
        onDenyRequest: (authToken, senderKey, recipientKey) => dispatch(actions.denyFriendRequestAttempt(authToken, senderKey, recipientKey)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(requestsSideDrawer);