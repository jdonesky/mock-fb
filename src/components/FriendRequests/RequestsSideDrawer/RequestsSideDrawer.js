

import React, {useEffect, useState} from 'react';
import classes from './RequestsSideDrawer.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Request from '../Request/Request';

import Gear from '../../../assets/images/TopNavButtonIcons/gear';

const requestsSideDrawer = props => {

    const {myFriends, onFetchMyFriendRequests, onFetchMyFriends, onFetchManyProfiles, authToken, myPublicProfileKey, receivedRequests, sentRequests} = props

    useEffect(() => {
        onFetchMyFriendRequests(authToken, myPublicProfileKey);
        onFetchMyFriends(authToken, myPublicProfileKey);
    }, [myFriends, onFetchMyFriendRequests, onFetchMyFriends, authToken, myPublicProfileKey])

    useEffect(() => {
        let combinedKeys = []
        if (props.receivedRequests && props.receivedRequests.length) {
            props.receivedRequests.forEach(req => {
                combinedKeys.push(req.userKey)
            })
        }
        if (props.sentRequests && props.sentRequests.length) {
            props.sentRequests.forEach(req => {
                combinedKeys.push(req.userKey)
            })
        }
        console.log('keys to fetch', combinedKeys);
        if (combinedKeys && combinedKeys.length) {
            onFetchManyProfiles(authToken, combinedKeys)
        }
    }, [receivedRequests, sentRequests, onFetchManyProfiles, authToken])

    useEffect(() => {
        console.log('My sent requests', props.sentRequests);
        console.log('My received requests', props.receivedRequests);
    })

    const [seeingAll, setSeeingAll] = useState(false);

    let requestsCount = props.receivedRequests && props.receivedRequests.length ? props.receivedRequests.length : 0
    let paths;
    let viewSentButton;
    if (seeingAll) {
        paths = <div className={classes.Paths}><span className={classes.Path} onClick={() => setSeeingAll(false)}>Friends</span> > <span className={classes.Path}>Friend Requests</span></div>
        viewSentButton = <div className={classes.ViewSent}>View Sent Requests</div>
    }

    let receivedRequestsList;
    if (props.receivedRequests && props.receivedRequests.length) {
        receivedRequestsList = props.receivedRequests.map( req => (
            <Request

            />
        ))
    }

    let sentRequestsList;
    if (seeingAll) {
        if (props.sentRequests && props.sentRequests.length) {
            sentRequestsList = props.sentRequests.map( req => (
                <Request

                />
            ))

        }
    }

    return (
        <div className={classes.SideDrawerContainer}>
            {paths}
            <section className={classes.Header} style={{top: seeingAll ? '83px' : null, height: seeingAll ? "40px" : null}}>
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
        requestersProfiles: state.users.manyProfiles
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