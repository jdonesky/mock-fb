

import React, {useEffect} from 'react';
import classes from './RequestsSideDrawer.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import Gear from '../../../assets/images/TopNavButtonIcons/gear';

const requestsSideDrawer = props => {

    const {myFriends, onFetchMyFriends, authToken, myPublicProfileKey} = props

    useEffect(() => {
        onFetchMyFriends(authToken, myPublicProfileKey)
    }, [myFriends, onFetchMyFriends, authToken, myPublicProfileKey])

    let requestsCount = props.receivedRequests && props.receivedRequests.length ? props.receivedRequests.length : 0

    return (
        <div className={classes.SideDrawerContainer}>
            <section className={classes.Header}>
                <h1 className={classes.HeaderTitle}>Friends</h1>
                <div className={classes.SettingsIconContainer}><Gear /></div>
            </section>
            <div className={classes.Break}/>
            <section className={classes.ReceivedRequestsContainer}>
                <div className={classes.RequestsHeader}>
                    <span className={classes.RequestsCount}>{`${requestsCount} Friend Requests`}</span>
                    <div className={classes.SeeAllButton}>See All</div>
                </div>
            </section>


        </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        myPublicProfileKey: state.profile.publicProfileKey,
        myFriends: state.friends.friends,
        receivedRequests: state.friends.receivedRequests,
        sentRequests: state.friends.sentRequests
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchMyFriends: (authToken, publicProfileKey) => dispatch(actions.fetchFriendsAttempt(authToken, publicProfileKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(requestsSideDrawer);