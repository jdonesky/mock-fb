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
        onFetchPublicProfile(authToken, publicProfileKey)
    }, [onFetchPublicProfile, publicProfileKey, authToken])

    useEffect(() => {
        console.log('PUBLIC PROFILE', props.profile)
    })

    let mutualFriends;
    if (props.profile) {
        if (props.profile.friends && props.profile.friends.length && props.myFriends && props.myFriends.length) {
            mutualFriends = props.myFriends.filter(myFriend => props.friends.map(theirFriend => theirFriend.userId).includes(myFriend.userId))
        }
    }

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
                firstInfoIcon = <Link/>
            } else if (props.profile.currLocation) {
                firstInfo =
                    <span className={classes.InfoEntry}>{'Lives in '} <b>{props.profile.currLocation.name}</b></span>
                firstInfoIcon = <Home/>
            } else if (props.profile.education && props.profile.education.length) {
                firstInfo = <span
                    className={classes.InfoEntry}>{`Studie${props.profile.education[0].graduated ? 'd' : 's'} at `}
                    <b>{props.profile.education[0].school}</b></span>
                firstInfoIcon = <GradCap/>
            } else if (props.profile.hometown) {
                firstInfo = <span className={classes.InfoEntry}>{'Is from '} <b>{props.profile.hometown.name}</b></span>
                firstInfoIcon = <Pin/>
            } else if (props.profile.occupations && props.profile.occupations.length) {
                const sortedOccupations = props.profile.occupations && props.profile.occupations.sort((a, b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1 : -1)
                firstInfo =
                    <span className={classes.InfoEntry}>{`${sortedOccupations[0].currentEmployer ? '' : 'Former'}`}
                        <b>{sortedOccupations[0].position}</b> at <b>{sortedOccupations[0].company}</b></span>
                firstInfoIcon = <BriefCase/>
            } else {
                firstInfo = <span
                    className={classes.InfoEntry}>{`Was born ${convertDashedDatetime(props.profile.birthday)}`}</span>
                firstInfoIcon = <Cake/>
            }
        }
    }
    const firstInfoEntry = <div className={classes.InfoEntryContainer}>{firstInfoIcon}{firstInfo}</div>

    let secondInfo;
    let secondInfoIcon;
    if (props.profile) {
        if (props.profile.friends && props.profile.friends.length) {
            secondInfo = `Became friends with ${props.profile.friends[props.profile.friends.length - 1]}`
            secondInfoIcon = <Link/>
        } else if (props.profile.currLocation) {
            secondInfo =
                <span className={classes.InfoEntry}>{'Lives in '} <b>{props.profile.currLocation.name}</b></span>
            secondInfoIcon = <Home/>
        } else if (props.profile.education && props.profile.education.length) {
            secondInfo =
                <span className={classes.InfoEntry}>{`Studie${props.profile.education[0].graduated ? 'd' : 's'} at `}
                    <b>{props.profile.education[0].school}</b></span>
            secondInfoIcon = <GradCap/>
        } else if (props.profile.hometown) {
            secondInfo = <span className={classes.InfoEntry}>{'Is from '} <b>{props.profile.hometown.name}</b></span>
            secondInfoIcon = <Pin/>
        } else if (props.profile.occupations && props.profile.occupations.length) {
            const sortedOccupations = props.profile.occupations && props.profile.occupations.sort((a, b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1 : -1)
            secondInfo = <span className={classes.InfoEntry}>{`${sortedOccupations[0].currentEmployer ? '' : 'Former'}`}
                <b>{sortedOccupations[0].position}</b> at <b>{sortedOccupations[0].company}</b></span>
            secondInfoIcon = <BriefCase/>
        } else {
            secondInfo = null;
            secondInfoIcon = null;
        }
    }

    let secondInfoEntry;
    if (!secondInfo || !secondInfoIcon) {
        secondInfoEntry = null;
    } else {
        secondInfoEntry = <div className={classes.InfoEntryContainer}>{secondInfoIcon}{secondInfo}</div>
    }


    let isFriend;
    let firstControl;
    let secondControl;
    if (props.profile) {
        if (props.myFriends && props.myFriends.length) {
            isFriend = props.myFriends.find(friend => friend.userId === props.profile.userId)
        }
        if (isFriend) {
            firstControl = <button className={classes.ControlButton}>
                <div className={classes.MessageIcon}><FbMessage/></div>
                <span className={classes.ControlButtonText}>Message</span></button>
            secondControl = <button className={classes.ControlButton}>
                <div className={classes.ButtonIcon}><IsFriend/></div>
            </button>
        } else {
            firstControl = <button className={[classes.ControlButton, classes.AddFriendButton].join(" ")}>
                <div className={classes.ButtonIcon}><AddFriend/></div>
                <span className={classes.ControlButtonText}>Add Friend</span></button>
            if (props.profile.AllowMessages === 'ALL') {
                secondControl = <button className={classes.ControlButton}>
                    <div className={classes.ButtonIcon}><FbMessage/></div>
                </button>
            } else {
                secondControl = <button className={classes.ControlButton}>
                    <div className={classes.ButtonIcon}><Follow/></div>
                </button>
            }
        }
    }

    return (
        <div className={classes.Positioner} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
            <div className={classes.DropdownContainer}>
                <section className={classes.HeaderContainer}>
                    <div className={classes.ProfileImageBlock}>
                        <div className={classes.ProfileImage} style={{backgroundImage: props.profileImage ? `url(${props.profileImage})`: null}}>
                            {props.profileImage ? null : <Avatar />}
                        </div>
                        <div className={classes.UserInfoContainer}>
                            <div className={classes.UserName}>{props.name}</div>
                            {firstInfoEntry}
                            {secondInfoEntry}
                        </div>
                    </div>
                </section>
                <section className={classes.ControlsSection}>
                    {firstControl}
                    {secondControl}
                    <button className={classes.ControlButton}><div className={classes.ButtonIcon}><Dots /></div></button>
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