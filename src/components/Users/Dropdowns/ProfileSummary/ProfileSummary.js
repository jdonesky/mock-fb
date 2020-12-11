import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import classes from './ProfileSummary.css';
import * as actions from '../../../../store/actions/index';

import Avatar from '../../../../assets/images/profile-placeholder-gender-neutral';
import Friends from '../../../../assets/images/UserActivityIcons/friends';
import Link from '../../../../assets/images/UserActivityIcons/link';
import Home from '../../../../assets/images/UserActivityIcons/home';
import Pin from '../../../../assets/images/UserActivityIcons/pin';
import GradCap from '../../../../assets/images/UserActivityIcons/gradCap';
import BriefCase from '../../../../assets/images/UserActivityIcons/briefcase';

const profileSummaryDropdown = (props) => {

    const {onFetchPublicProfile, publicProfileKey, authToken} = props

    useEffect(() => {
        onFetchPublicProfile(authToken, publicProfileKey)
    }, [onFetchPublicProfile, publicProfileKey, authToken])

    let mutualFriends;
    if (props.profile.friends && props.profile.friends.length && props.myFriends && props.myFriends.length) {
        mutualFriends = props.myFriends.filter(myFriend => props.friends.map(theirFriend => theirFriend.userId).includes(myFriend.userId))
    }

    let firstInfo;
    let secondInfo;
    let firstInfoIcon;
    let secondInfoIcon;

    if (mutualFriends) {
        if (mutualFriends.length === 1) {
            firstInfo = <span className={classes.InfoEntry}>{"1 mutual friend:"} <b className={classes.MutualFriend}>{mutualFriends[0]}</b></span>
        } else if (mutualFriends.length === 2) {
            firstInfo = <span className={classes.InfoEntry}>{"2 mutual friends, including"} <b className={classes.MutualFriend}>{mutualFriends[0]}</b></span>
        } else {
            firstInfo = <span className={classes.InfoEntry}>{`${mutualFriends.length} mutual friends, including`} <b className={classes.MutualFriend}>{mutualFriends[0]}</b> and <b className={classes.MutualFriend}>{mutualFriends[1]}</b></span>
        }
        firstInfoIcon = <Friends />
    } else {
        if (props.profile.friends && props.profile.friends.length) {
            firstInfo = `Became friends with ${props.profile.friends[props.profile.friends.length - 1]}`
            firstInfoIcon = <Link />
        } else if (props.profile.currLocation) {
            firstInfo =
                <span className={classes.InfoEntry}>{'Lives in '} <b>{props.profile.currLocation.name}</b></span>
            firstInfoIcon = <Home/>
        } else if (props.profile.education && props.profile.education.length) {
                firstInfo = <span className={classes.InfoEntry}>{`Studie${props.profile.education[0].graduated ? 'd' : 's'} at `} <b>{props.profile.education[0].school}</b></span>
                firstInfoIcon = <GradCap />
        } else if (props.profile.hometown) {
            firstInfo = <span className={classes.InfoEntry}>{'Comes from '} <b>{props.profile.hometown.name}</b></span>
            firstInfoIcon = <Pin />
        }
    }



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
        authToken: state.auth.token,
        profile: state.users.singleProfile
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchPublicProfile: (authToken,publicProfileKey) => dispatch(actions.fetchPublicProfileAttempt(authToken,publicProfileKey))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(profileSummaryDropdown);