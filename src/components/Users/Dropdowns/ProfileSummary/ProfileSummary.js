import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './ProfileSummary.css';
import * as actions from '../../../../store/actions/index';

import Avatar from '../../../../assets/images/profile-placeholder-gender-neutral';

const profileSummaryDropdown = (props) => {

    const {onFetchPublicProfile, publicProfileKey, authToken} = props

    useEffect(() => {
        onFetchPublicProfile(authToken, publicProfileKey)
    }, [onFetchPublicProfile, publicProfileKey, authToken])

    let mutualFriends;
    if (props.friends && props.friends.length && props.myFriends && props.myFriends.length) {
        mutualFriends = props.myFriends.filter(myFriend => props.friends.map(theirFriend => theirFriend.userId).includes(myFriend.userId))
    }

    let firstInfo;
    if (mutualFriends) {
        firstInfo = mutualFriends
    }

    let secondInfo;


    return (
        <div className={classes.DropdownContainer}>
            <section className={classes.HeaderContainer}>
                <div className={classes.ProfileImageBlock}>
                    <div className={classes.ProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})`: null}}>
                        {props.profileImage ? null : <Avatar />}
                    </div>
                    <div className={classes.UserInfoContainer}>
                        <div className={classes.UserName}>{props.name}</div>
                        <div className={classes.InfoEntry}></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchPublicProfile: (authToken,publicProfileKey) => dispatch(actions.fetchPublicProfileAttempt(authToken,publicProfileKey))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(profileSummaryDropdown);