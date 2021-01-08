

import React, {useState,useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
import classes from './Friends.css'
import Friend from './Friend/Friend';
import InlineDots from '../../../UI/Spinner/InlineDots';

const friends = (props) => {

    const [displayProfile, setDisplayProfile] = useState(props.history.location.pathname.split('/')[2])
    const {myPublicProfileKey, myPublicProfile, otherProfile, otherPublicProfile} = props;
    const [loadedFriends, setLoadedFriends] = useState(null)

    useEffect(() => {
        return () => {
            setLoadedFriends(null);
        }
    }, [])

    useEffect(() => {
        if (displayProfile !== props.history.location.pathname.split('/')[2]) {
            setDisplayProfile(props.history.location.pathname.split('/')[2])
        }
    })

    useEffect(() => {
        if (displayProfile === 'me') {
            if (myPublicProfile) {
                setLoadedFriends(myPublicProfile.friends);
            }
        } else if (displayProfile !== 'me') {
            if (otherPublicProfile) {
                setLoadedFriends(otherPublicProfile.friends);
            }
        }

    }, [displayProfile, myPublicProfile, otherPublicProfile])

    const navToProfile = (key) => {
        props.history.push(`/user-profile/${key}`);
    }

    let friends;
    if (loadedFriends && loadedFriends.length) {
        friends = loadedFriends.map(friend => (
            <Friend
                key={friend.userKey}
                userKey={friend.userKey}
                publicProfileKey={friend.publicProfileKey}
                profileImage={friend.profileImage}
                name={friend.name}
                myFriends={myPublicProfile && myPublicProfile.friends}
                nav={() => navToProfile(friend.userKey)}
            />
        ))
    }

    let loadingIndicator;
    if (props.fetchingMyPublicProfile || props.fetchingOtherPublicProfile) {
        loadingIndicator = <InlineDots />
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Header}>
                <h2>Friends</h2>
                {loadingIndicator}
                <div className={classes.Link} onClick={() => props.history.push(`/user-profile/${displayProfile}/friends`)}>See All</div>
            </div>
            <section className={classes.FriendsContainer}>
                {friends}
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        myPublicProfileKey: state.profile.publicProfileKey,
        myPublicProfile: state.profile.publicProfile,
        otherProfile: state.users.fullProfile,
        otherPublicProfile: state.users.singleProfile,
        fetchingOtherPublicProfile: state.users.loadingSingleProfile,
        fetchingMyPublicProfile: state.profile.publicProfileLoading
    }
}


export default connect(mapStateToProps)(withRouter(friends))