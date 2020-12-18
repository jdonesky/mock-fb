import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import classes from './ProfileSummary.css';
import dropdownClasses from './SummaryOptionMenus/Shared.css';
import * as actions from '../../../../store/actions/index';

import IsFriendOptions from './SummaryOptionMenus/IsFriendDropdown';
import OutsideAlerter from "../../../../hooks/outsideClickHandler";

import Avatar from '../../../../assets/images/profile-placeholder-gender-neutral';
import Friends from '../../../../assets/images/UserActivityIcons/friends';
import Link from '../../../../assets/images/UserActivityIcons/link';
import Home from '../../../../assets/images/UserActivityIcons/home';
import Pin from '../../../../assets/images/UserActivityIcons/pin';
import GradCap from '../../../../assets/images/UserActivityIcons/gradCap';
import BriefCase from '../../../../assets/images/UserActivityIcons/briefcase';
import Cake from '../../../../assets/images/cake';
import FbMessage from '../../../../assets/images/UserActionIcons/fbMessage';
import AddFriend from '../../../../assets/images/UserActionIcons/addFriend';
import RespondRequest from '../../../../assets/images/UserActionIcons/respondRequest';
import UnFriend from '../../../../assets/images/UserActionIcons/unfriend';
import IsFriend from '../../../../assets/images/UserActivityIcons/isFriend';
import Follow from '../../../../assets/images/UserActionIcons/follow';
import Dots from '../../../../assets/images/dots';
import Pen from '../../../../assets/images/edit';
import Eye from '../../../../assets/images/eye';
import BlockUser from '../../../../assets/images/UserActionIcons/blockUser';
import ActivityLog from '../../../../assets/images/UserActivityIcons/activityLog';
import Spinner from '../../../../components/UI/Spinner/Spinner';

import {convertDashedDatetime} from "../../../../shared/utility";

const profileSummaryDropdown = (props) => {

    const {onFetchMyFriendRequests, onFetchPublicProfile, publicProfileKey, authToken} = props

    const [viewingIsFriendsOptions, setViewingIsFriendsOptions] = useState(false);
    const [viewingMoreOptions, setViewingMoreOptions] = useState(false);
    const [friendRequestSent, setFriendRequestSent] = useState(false);
    const [friendRequestCanceled, setFriendRequestCanceled] = useState(false);
    const [respondingRequest, setRespondingRequest] = useState(false);

    useEffect(() => {
        onFetchMyFriendRequests(authToken, props.myPublicProfileKey)
        onFetchPublicProfile(authToken, publicProfileKey)
        return () => {
            userName = null;
            profileImage = null;
            mutualFriends = null;
            firstInfo = null;
            firstInfoIcon = null;
            secondInfo = null;
            secondInfoIcon = null;
            isFriend = null;
        }
    }, [onFetchPublicProfile, publicProfileKey, authToken])


    useEffect(() => {
        props.onFetchMyFriendRequests(authToken,props.myPublicProfileKey);
    }, [friendRequestCanceled])

    useEffect(() => {
        console.log('this profile ', props.profile);
        console.log('my sent requests' , props.mySentRequests)
        console.log('my received requests' , props.myReceivedRequests)
    })

    const goToFullProfile = () => {
        if (props.profile) {
            if (props.profile.userKey === props.firebaseKey) {
                props.history.push(`/user-profile/me`)
            } else {
                props.history.push(`/user-profile/${props.profile.userKey}`)
            }
        }
    }

    const sendFriendRequest = () => {
        props.onSendFriendRequest(authToken, props.myPublicProfileKey, publicProfileKey)
        setFriendRequestSent(true)
        if (friendRequestCanceled) {
            setFriendRequestCanceled(false)
        }
    }

    const cancelFriendRequest = () => {
        props.onCancelFriendRequest(authToken, props.myPublicProfileKey, publicProfileKey)
        setFriendRequestCanceled(true);
        setFriendRequestSent(false);

    }

    let mutualFriends;
    if (props.profile) {
        if (props.profile.friends && props.profile.friends.length && props.myFriends && props.myFriends.length) {
            mutualFriends = props.myFriends.filter(myFriend => props.friends.map(theirFriend => theirFriend.userId).includes(myFriend.userId))
        }
    }

    let firstInfo;
    let firstInfoIcon;
    let markFirst;
    if (props.profile) {
            if (mutualFriends) {
                if (mutualFriends.length === 1) {
                    firstInfo = <span className={classes.InfoEntry}>{"1 mutual friend:"} <b
                        className={classes.MutualFriend}>{mutualFriends[0]}</b></span>
                } else if (mutualFriends.length === 2) {
                    firstInfo = <span className={classes.InfoEntry}>{"2 mutual friends, including"} <b
                        className={classes.MutualFriend}>{mutualFriends[0]}</b></span>
                } else {
                    firstInfo =
                        <span className={classes.InfoEntry}>{`${mutualFriends.length} mutual friends, including`} <b
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
                    firstInfo = <span className={classes.InfoEntry}>{'Lives in '}
                        <b>{props.profile.currLocation.name}</b></span>
                    firstInfoIcon = <Home fill='rgba(0,0,0,0.5)'/>
                    markFirst = 'CURRLOCATION'
                } else if (props.profile.education && props.profile.education.length) {
                    firstInfo = <span
                        className={classes.InfoEntry}>{`Studie${props.profile.education[0].graduated ? 'd' : 's'} at `}<b>{props.profile.education[0].school}</b></span>
                    firstInfoIcon = <GradCap fill='rgba(0,0,0,0.5)'/>
                    markFirst = 'EDUCATION'
                } else if (props.profile.hometown) {
                    firstInfo =
                        <span className={classes.InfoEntry}>{'From '} <b>{props.profile.hometown.name}</b></span>
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
                        className={classes.InfoEntry}>{`Born ${convertDashedDatetime(props.profile.birthday)}`}</span>
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
                secondInfo =
                    <span className={classes.InfoEntry}>{'Lives in '} <b>{props.profile.currLocation.name}</b></span>
                secondInfoIcon = <Home fill='rgba(0,0,0,0.5)'/>
            } else if (props.profile.education && props.profile.education.length && markFirst !== 'EDUCATION') {
                secondInfo = <span
                    className={classes.InfoEntry}>{`Studie${props.profile.education[0].graduated ? 'd' : 's'} at `}<b>{props.profile.education[0].school}</b></span>
                secondInfoIcon = <GradCap fill='rgba(0,0,0,0.5)'/>
            } else if (props.profile.hometown && markFirst !== 'HOMETOWN') {
                secondInfo = <span className={classes.InfoEntry}>{'From '} <b>{props.profile.hometown.name}</b></span>
                secondInfoIcon = <Pin fill='rgba(0,0,0,0.5)'/>
            } else if (props.profile.occupations && props.profile.occupations.length && markFirst !== 'OCCUPATION') {
                const sortedOccupations = props.profile.occupations && props.profile.occupations.sort((a, b) => (new Date(a.endYear) < new Date(b.endYear)) ? 1 : -1)
                secondInfo =
                    <span className={classes.InfoEntry}>{`${sortedOccupations[0].currentEmployer ? '' : 'Former'}`}
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

    let isFriendsOptions;
    if (viewingIsFriendsOptions) {
        isFriendsOptions = <IsFriendOptions />
    };

    let addFriendButtonText;
    let addFriendButtonIcon;
    let addFriendButtonClasses = [classes.ControlButton, classes.FirstControl, classes.AddFriendButton];
    let addFriendButtonAction;


    if (props.profile) {
        if (friendRequestSent || (props.mySentRequests && props.mySentRequests.findIndex(req => req.publicProfileKey === publicProfileKey) !== -1)) {
            console.log('REQUEST SENT')
            addFriendButtonText = 'Cancel Request';
            addFriendButtonIcon = <UnFriend fill='#155fe8'/>
            addFriendButtonAction = cancelFriendRequest;
        }

        if (!friendRequestSent && (props.mySentRequests && props.mySentRequests.findIndex(req => req.publicProfileKey === publicProfileKey) === -1) || friendRequestCanceled) {
            console.log('NO REQUEST SENT OR REQUEST CANCELED')
            addFriendButtonText = 'Add Friend';
            addFriendButtonIcon = <AddFriend fill='#155fe8'/>
            addFriendButtonAction = sendFriendRequest;
        }

        if (props.myReceivedRequests && props.myReceivedRequests.findIndex(req => req.publicProfileKey === publicProfileKey) !== -1) {
            addFriendButtonText = 'Respond'
            addFriendButtonIcon = <RespondRequest fill='#155fe8' />
            addFriendButtonAction = () => setRespondingRequest(prevState => {return !prevState})
        }
    }

    if (props.sendingRequest || props.cancelingRequest) {
        addFriendButtonIcon = <Spinner bottom={'53px'} right={"3px"}/>
    }

    let isFriend;
    let firstControl;
    let secondControl;
    if (props.profile) {
        if (props.profile.userKey !== props.firebaseKey) {
            if (props.myFriends && props.myFriends.length) {
                isFriend = props.myFriends.find(friend => friend.userId === props.profile.userId)
            }
            if (isFriend) {
                firstControl = <div className={[classes.ControlButton, classes.FirstControl].join(" ")}>
                    <div className={classes.MessageIcon}><FbMessage/></div>
                    <span className={classes.ControlButtonText}>Message</span></div>
                secondControl = (
                    <OutsideAlerter action={() => setViewingIsFriendsOptions(false)}>
                        <div className={classes.ControlButton}>
                            <div className={classes.ButtonIcon} onClick={() => setViewingIsFriendsOptions(true)}>
                                <IsFriend/></div>
                        </div>
                        {isFriendsOptions}
                    </OutsideAlerter>
                )
            } else {
                firstControl =
                    <div className={addFriendButtonClasses.join(" ")} onClick={addFriendButtonAction}>
                        <div className={[classes.ButtonIcon, classes.AddFriendIcon].join(" ")}>
                            {addFriendButtonIcon}
                        </div>
                        <span className={classes.ControlButtonText}>{addFriendButtonText}</span>
                    </div>
                if (props.profile.privacy.AllowMessages === 'ALL') {
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
        } else {
            firstControl = <div className={[classes.ControlButton, classes.FirstControl].join(" ")}><div className={[classes.ButtonIcon, classes.EditProfileIcon].join(" ")}><Pen /></div><span className={classes.ControlButtonText}>Edit Profile</span></div>
            secondControl =  <div className={classes.ControlButton}><div className={classes.ButtonIcon}><Eye /></div></div>
        }
    }

    let moreOptions;
    let moreOptionsText;
    let moreOptionsIcon;
    let moreOptionsAction;
    if (props.profile) {
        if (props.firebaseKey === props.profile.userKey) {
            moreOptionsText = 'Activity Log'
            moreOptionsIcon = <ActivityLog />
            // moreOptionsAction =
        } else {
            moreOptionsText = 'Block'
            moreOptionsIcon =  <BlockUser />
            // moreOptionsAction =
        }
        if (viewingMoreOptions) {
            moreOptions = (
                <div className={dropdownClasses.Container}>
                    <div className={dropdownClasses.Option} onClick={moreOptionsAction}>
                        <div className={dropdownClasses.OptionIcon}>{moreOptionsIcon}</div>
                        <span className={dropdownClasses.OptionText}>{moreOptionsText}</span>
                    </div>
                </div>
            )
        }
    }

    let userName;
    if (props.profile) {
        userName = `${props.profile.firstName } ${props.profile.lastName}`
    }

    let profileImage;
    if (props.profile) {
        profileImage = props.profile.profileImage
    }

    return (
        <div className={classes.Positioner} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
            <div className={classes.DropdownContainer}>
                <section className={classes.HeaderContainer}>
                    <div className={classes.ProfileImageBlock}>
                        <div className={classes.ProfileImage} style={{backgroundImage: profileImage ? `url(${profileImage})`: null}} onClick={goToFullProfile}>
                            {profileImage ? null : <Avatar />}
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
                    <OutsideAlerter action={() => setViewingMoreOptions(false)}>
                        <div className={classes.ControlButton} onClick={() => setViewingMoreOptions(true)}><div className={[classes.ButtonIcon, classes.DotsIcon].join(" ")}><Dots /></div></div>
                        {moreOptions}
                    </OutsideAlerter>
                </section>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        profile: state.users.singleProfile,
        firebaseKey: state.profile.firebaseKey,
        myPublicProfileKey: state.profile.publicProfileKey,
        mySentRequests: state.friends.sentRequests,
        myReceivedRequests: state.friends.receivedRequests,
        sendingRequest: state.friends.sendingFriendRequest,
        cancelingRequest: state.friends.cancelingFriendRequest,
        myFriends: state.friends.friends
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPublicProfile: (authToken,publicProfileKey) => dispatch(actions.fetchPublicProfileAttempt(authToken,publicProfileKey)),
        onSendFriendRequest: (authToken, senderKey, recipientKey) => dispatch(actions.sendFriendRequestAttempt(authToken, senderKey, recipientKey)),
        onCancelFriendRequest: (authToken, senderKey, recipientKey) => dispatch(actions.cancelFriendRequestAttempt(authToken, senderKey, recipientKey)),
        onFetchMyFriendRequests: (authToken, publicProfileKey) => dispatch(actions.fetchFriendRequestsAttempt(authToken, publicProfileKey))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(profileSummaryDropdown));