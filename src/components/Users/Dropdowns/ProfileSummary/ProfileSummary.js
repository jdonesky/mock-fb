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
import Cake from '../../../../assets/images/cake';
import FbMessage from '../../../../assets/images/UserActionIcons/fb-message';
import AddFriend from '../../../../assets/images/UserActionIcons/add-friend';
import IsFriend from '../../../../assets/images/UserActivityIcons/isFriend';
import Follow from '../../../../assets/images/UserActionIcons/follow';
import Dots from '../../../../assets/images/dots';
import {convertDashedDatetime} from "../../../../shared/utility";

const profileSummaryDropdown = (props) => {

    const {onFetchPublicProfile, publicProfileKey, authToken} = props

    useEffect(() => {
        console.log('publicProfileKey', publicProfileKey)
        onFetchPublicProfile(authToken, publicProfileKey)
    }, [onFetchPublicProfile, publicProfileKey, authToken])

    useEffect(() => {
        console.log('publicProfileKey',publicProfileKey)
        console.log('PUBLIC PROFILE', props.profile)
    })

    let mutualFriends;
    if (props.profile) {
        if (props.profile.friends && props.profile.friends.length && props.myFriends && props.myFriends.length) {
            mutualFriends = props.myFriends.filter(myFriend => props.friends.map(theirFriend => theirFriend.userId).includes(myFriend.userId))
        }
    }

    let markFirst;
    let firstInfo;
    let firstInfoIcon;
    if (props.profile) {
        if (mutualFriends) {
            if (mutualFriends.length === 1) {
                firstInfo = <span className={classes.InfoEntry}>{"1 mutual friend:"} <b
                    className={classes.MutualFriend}>{mutualFriends[0]}</b></span>
            } else if (mutualFriends.length === 2) {
                firstInfo = <span className={classes.InfoEntry}>{"2 mutual friends, including"} <b
                    className={classes.MutualFriend}>{mutualFriends[0]}</b></span>
            } else {
                firstInfo = <span className={classes.InfoEntry}>{`${mutualFriends.length} mutual friends, including`} <b
                    className={classes.MutualFriend}>{mutualFriends[0]}</b> and <b
                    className={classes.MutualFriend}>{mutualFriends[1]}</b></span>
            }
            firstInfoIcon = <Friends/>
        } else {
            if (props.profile.friends && props.profile.friends.length) {
                firstInfo = `Became friends with ${props.profile.friends[props.profile.friends.length - 1]}`
                firstInfoIcon = <Link fill='rgba(0,0,0,0.5)'/>
                markFirst = 'FRIENDS'
            } else if (props.profile.currLocation) {
                firstInfo = <span className={classes.InfoEntry}>{'Lives in '} <b>{props.profile.currLocation.name}</b></span>
                firstInfoIcon = <Home fill='rgba(0,0,0,0.5)'/>
                markFirst = 'CURRLOCATION'
            } else if (props.profile.education && props.profile.education.length) {
                firstInfo = <span className={classes.InfoEntry}>{`Studie${props.profile.education[0].graduated ? 'd' : 's'} at `}<b>{props.profile.education[0].school}</b></span>
                firstInfoIcon = <GradCap fill='rgba(0,0,0,0.5)'/>
                markFirst = 'EDUCATION'
            } else if (props.profile.hometown) {
                firstInfo = <span className={classes.InfoEntry}>{'From '} <b>{props.profile.hometown.name}</b></span>
                firstInfoIcon = <Pin fill='rgba(0,0,0,0.5)'/>
                markFirst = 'HOMETOWN'
            } else if (props.profile.occupations && props.profile.occupations.length) {
                const sortedOccupations = props.profile.occupations && props.profile.occupations.sort((a, b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1 : -1)
                firstInfo =
                    <span className={classes.InfoEntry}>{`${sortedOccupations[0].currentEmployer ? '' : 'Former'}`}
                        <b>{sortedOccupations[0].position}</b> at <b>{sortedOccupations[0].company}</b></span>
                firstInfoIcon = <BriefCase fill='rgba(0,0,0,0.5)'/>
                markFirst = 'OCCUPATION'
            } else {
                firstInfo = <span
                    className={classes.InfoEntry}>{`Was born ${convertDashedDatetime(props.profile.birthday)}`}</span>
                firstInfoIcon = <Cake fill='rgba(0,0,0,0.5)'/>
            }
        }
    }
    const firstInfoEntry = <div className={classes.InfoEntryContainer}><div className={classes.InfoIcon}>{firstInfoIcon}</div>{firstInfo}</div>

    let secondInfo;
    let secondInfoIcon;
    if (props.profile) {
        if (props.profile.friends && props.profile.friends.length && markFirst !== 'FRIENDS') {
            secondInfo = `Became friends with ${props.profile.friends[props.profile.friends.length - 1]}`
            secondInfoIcon = <Link fill='rgba(0,0,0,0.5)'/>
        } else if (props.profile.currLocation && markFirst !== 'CURRLOCATION') {
            secondInfo = <span className={classes.InfoEntry}>{'Lives in '} <b>{props.profile.currLocation.name}</b></span>
            secondInfoIcon = <Home fill='rgba(0,0,0,0.5)'/>
        } else if (props.profile.education && props.profile.education.length && markFirst !== 'EDUCATION') {
            secondInfo = <span className={classes.InfoEntry}>{`Studie${props.profile.education[0].graduated ? 'd' : 's'} at `}<b>{props.profile.education[0].school}</b></span>
            secondInfoIcon = <GradCap fill='rgba(0,0,0,0.5)'/>
        } else if (props.profile.hometown && markFirst !== 'HOMETOWN') {
            secondInfo = <span className={classes.InfoEntry}>{'From '} <b>{props.profile.hometown.name}</b></span>
            secondInfoIcon = <Pin fill='rgba(0,0,0,0.5)'/>
        } else if (props.profile.occupations && props.profile.occupations.length && markFirst !== 'OCCUPATION') {
            const sortedOccupations = props.profile.occupations && props.profile.occupations.sort((a, b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1 : -1)
            secondInfo = <span className={classes.InfoEntry}>{`${sortedOccupations[0].currentEmployer ? '' : 'Former'}`}
                <b>{sortedOccupations[0].position}</b> at <b>{sortedOccupations[0].company}</b></span>
            secondInfoIcon = <BriefCase fill='rgba(0,0,0,0.5)'/>
        } else {
            secondInfo = null;
            secondInfoIcon = null;
        }
    }

    let secondInfoEntry;
    if (!secondInfo || !secondInfoIcon) {
        secondInfoEntry = null;
    } else {
        secondInfoEntry = <div className={classes.InfoEntryContainer}><div className={classes.InfoIcon}>{secondInfoIcon}</div>{secondInfo}</div>
    }


    let isFriend;
    let firstControl;
    let secondControl;
    if (props.profile) {
        if (props.myFriends && props.myFriends.length) {
            isFriend = props.myFriends.find(friend => friend.userId === props.profile.userId)
        }
        if (isFriend) {
            firstControl = <button className={[classes.ControlButton, classes.FirstControl].join(" ")}>
                <div className={classes.MessageIcon}><FbMessage /></div>
                <span className={classes.ControlButtonText}>Message</span></button>
            secondControl = <button className={classes.ControlButton}>
                <div className={classes.ButtonIcon}><IsFriend /></div>
            </button>
        } else {
            firstControl = <div className={[classes.ControlButton, classes.FirstControl, classes.AddFriendButton].join(" ")}>
                <div className={[classes.ButtonIcon, classes.AddFriendIcon].join(" ")}><AddFriend fill='#155fe8'/></div>
                <span className={classes.ControlButtonText}>Add Friend</span></div>
            if (props.profile.AllowMessages === 'ALL') {
                secondControl =
                    <div className={classes.ControlButton}>
                        <div className={classes.ButtonIcon}><FbMessage/></div>
                    </div>
            } else {
                secondControl =
                    <div className={classes.ControlButton}>
                    <div className={classes.ButtonIcon}><Follow/></div>
                    </div>
            }
        }
    }

    let userName;
    if (props.profile) {
        userName = `${props.profile.firstName } ${props.profile.lastName}`
    }

    return (
        <div className={classes.Positioner} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
            <div className={classes.DropdownContainer}>
                <section className={classes.HeaderContainer}>
                    <div className={classes.ProfileImageBlock}>
                        <div className={classes.ProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})`: null}}>
                            {props.profileImage ? null : <Avatar />}
                        </div>
                    </div>
                    <div className={classes.UserInfoContainer}>
                        <div className={classes.UserName}>{userName}</div>
                        {firstInfoEntry}
                        {secondInfoEntry}
                    </div>
                </section>
                <section className={classes.ControlsSection}>
                    {firstControl}
                    {secondControl}
                    <div className={classes.ControlButton}><div className={[classes.ButtonIcon, classes.DotsIcon].join(" ")}><Dots /></div></div>
                </section>
            </div>
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