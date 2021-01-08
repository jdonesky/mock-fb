import React, {useState,useEffect,useRef, useContext} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import classes from './ProfileSummary.css';
import dropdownClasses from './SummaryOptionMenus/Shared.css';
import * as actions from '../../../../store/actions/index';

import IsFriendOptions from './SummaryOptionMenus/IsFriendDropdown';
import RespondRequestDropdown from '../RespondRequest/RespondRequest';
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
import Like from '../../../../assets/images/like';
import Dots from '../../../../assets/images/dots';
import Pen from '../../../../assets/images/edit';
import Eye from '../../../../assets/images/eye';
import BlockUser from '../../../../assets/images/UserActionIcons/blockUser';
import ActivityLog from '../../../../assets/images/UserActivityIcons/activityLog';
import Web from '../../../../assets/images/MiscIcons/web';
import Email from '../../../../assets/images/email';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import InlineDots from '../../../../components/UI/Spinner/InlineDots';
import {convertDashedDatetime} from "../../../../shared/utility";
import {checkComponentVisibility} from "../../../../shared/utility";
import {MessengerContext} from "../../../../context/messenger-context";
import getWindowDimensions from "../../../../hooks/getWindowDimensions";

const profileSummaryDropdown = (props) => {

    const { width, height } = getWindowDimensions()
    const {onFetchMyFriendRequests, onFetchPublicProfile, onFetchPageSummary, publicProfileKey, myPublicProfile, authToken, userType, pageSummary, userKey, onClearProfileSummary, onClearPageSummary} = props
    const messengerContext = useContext(MessengerContext);
    const container = useRef(null);

    const [viewingIsFriendsOptions, setViewingIsFriendsOptions] = useState(false);
    const [viewingMoreOptions, setViewingMoreOptions] = useState(false);
    const [friendRequestSent, setFriendRequestSent] = useState(false);
    const [friendRequestCanceled, setFriendRequestCanceled] = useState(false);
    const [respondingRequest, setRespondingRequest] = useState(false);
    const [acceptedRequest, setAcceptedRequest] = useState(false);
    const [deniedRequest, setDeniedRequest] = useState(false);
    const [likedPage, setLikedPage] = useState(false);

    const [adjustTop, setAdjustTop] = useState(null);
    const [adjustBottom, setAdjustBottom] = useState(null);
    const [adjustLeft, setAdjustLeft] = useState(null);
    const [adjustRight, setAdjustRight] = useState(null);

    useEffect(() => {
        // console.log('top - ', adjustTop)
        if (adjustBottom) {

        console.log('bottom - ', adjustBottom)
        }
        // console.log('left - ', adjustLeft)
        // console.log('right - ', adjustRight)
        console.log('loc', props.loc)
        console.log('style', style)
    })

    useEffect(() => {
        const out = checkComponentVisibility(container.current)
        if (out.top) {
            setAdjustTop(out.top);
        }
        if (out.bottom) {
            setAdjustBottom(out.bottom);
        }
        if (out.right) {
            setAdjustRight(out.right);
        }
        if (out.left) {
            setAdjustLeft(out.left);
        }

    })

    useEffect(() => {
        if (!userType) {
            onFetchMyFriendRequests(authToken, props.myPublicProfileKey)
            onFetchPublicProfile(authToken, publicProfileKey, 'SUMMARY');
        } else if (userType === 'PAGE') {
            if (userKey) {
                onFetchPageSummary(authToken, userKey)
            }
        }
        return () => {
            if (!userType) {
                onClearProfileSummary();
            } else if (userType === 'PAGE') {
                onClearPageSummary();
            }
        }
    }, [onFetchPublicProfile, publicProfileKey, authToken, userType, userKey, onClearProfileSummary, onClearPageSummary])

    useEffect(() => {
        if (likedPage) {
            props.onFetchMyPublicProfile(authToken, props.myPublicProfileKey)
        }
    }, [likedPage])

    useEffect(() => {
        if (friendRequestCanceled) {
            props.onFetchMyFriendRequests(authToken,props.myPublicProfileKey);
        }
    }, [friendRequestCanceled])

    useEffect(() => {
        if (acceptedRequest) {
            props.onFetchMyFriends(authToken, props.myPublicProfileKey)
        }
    }, [acceptedRequest])

    const goToFullProfile = () => {
        if (!userType) {
            if (props.profile) {
                if (props.profile.userKey === props.firebaseKey) {
                    props.history.push(`/user-profile/me`)
                } else {
                    props.history.push(`/user-profile/${props.profile.userKey}`)
                }
            }
        } else if (userType === 'PAGE') {
                if (pageSummary) {
                    props.history.push(`/page/view/${pageSummary.dbKey}`)
                }
            }
        }

    const startChat = () => {
        if (props.profile) {
            messengerContext.startChat(props.profile)
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

    const likePage = () => {

        let newProfile;
        let newProfileLikes;
        let newProfilePageLikes;

        let newPageSummary;
        let newPageLikes;
        let newPageReceivedLikes;

        let newReceivedLike;
        let newSentLike;

        if (pageSummary && myPublicProfile) {

            newReceivedLike = {name: myPublicProfile.firstName + ' ' + myPublicProfile.lastName, profileImage: myPublicProfile.profileImage, publicProfileKey: props.myPublicProfileKey, userKey: myPublicProfile.userKey}
            newPageSummary = {...pageSummary}
            newSentLike = {name: pageSummary.name, profileImage: pageSummary.profileImage, dbKey: pageSummary.dbKey}
            newProfile = {...myPublicProfile}

            if (newPageSummary.likes) {
                newPageLikes = {...newPageSummary.likes}
                if (newPageLikes.received) {
                    newPageReceivedLikes = [...newPageLikes.received, newReceivedLike ]
                } else {
                    newPageReceivedLikes = [newReceivedLike]
                }
                newPageLikes.received = newPageReceivedLikes
            } else {
                newPageLikes = {received: [newReceivedLike]}
            }
            newPageSummary.likes = newPageLikes
            console.log('newPageSummary with likes ', newPageSummary);
            if (newProfile.likes) {
                newProfileLikes = {...newProfile.likes}
                if (newProfileLikes.pages) {
                    newProfilePageLikes = [...newProfileLikes.pages, newSentLike]
                } else {
                    newProfilePageLikes = [newSentLike]
                }
                newProfileLikes.pages = newProfilePageLikes
            } else {
                newProfileLikes = {pages: [newSentLike]}
            }
            newProfile.likes = newProfileLikes
            console.log('newProfile with sent likes', newProfile)
            props.onLikePage(authToken, newPageSummary, newProfile, props.myPublicProfileKey);
            setLikedPage(true);
        }
    }

    const cancelLike = () => {
        setLikedPage(false);
    }

    let mutualFriends;
    if (!userType) {
        if (props.profile) {
            if (props.profile.friends && props.profile.friends.length) {
                if (props.myFriends && props.myFriends.length) {
                    mutualFriends = props.myFriends.filter(myFriend => props.profile.friends.map(theirFriend => theirFriend.userKey).includes(myFriend.userKey))
                }
            }
        }
    }

    let firstInfo;
    let firstInfoIcon;
    let markFirst;
    let firstInfoEntry;
    let pageDescriptionBlock;
    let pageCategory;
    let pageDescription;
    if (!userType) {
        if (props.profile) {
            if (mutualFriends && mutualFriends.length > 0) {
                if (props.profile.userKey !== props.firebaseKey) {
                    if (mutualFriends.length === 1) {
                        firstInfo = <span className={classes.InfoEntry}>{"1 mutual friend:"} <b
                            className={classes.MutualFriend}>{mutualFriends[0].name}</b></span>
                    } else if (mutualFriends.length === 2) {
                        firstInfo = <span className={classes.InfoEntry}>{"2 mutual friends, including"} <b
                            className={classes.MutualFriend}>{mutualFriends[0].name}</b></span>
                    } else {
                        firstInfo =
                            <span className={classes.InfoEntry}>{`${mutualFriends.length} mutual friends, including`} <b
                                className={classes.MutualFriend}>{mutualFriends[0].name}</b> and <b
                                className={classes.MutualFriend}>{mutualFriends[1].name}</b></span>
                    }
                    firstInfoIcon = <Friends/>
                }
            } else {
                if (props.profile.friends && props.profile.friends.length) {
                    firstInfo = `Became friends with ${props.profile.friends[props.profile.friends.length - 1].name}`
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
    } else if (userType === 'PAGE') {
        if (pageSummary) {
            pageCategory = <div className={classes.PageCategory}>{pageSummary.category}</div>
            if (pageSummary.description) {
                pageDescription = <div className={classes.PageDescription}>{pageSummary.description}</div>
            }
            if (pageSummary.website) {
                 firstInfo = <span className={[classes.InfoEntry, classes.ClickableEntry].join(" ")}>{pageSummary.website}</span>
                firstInfoIcon = <Web fill='rgba(0,0,0,0.5)'/>
                markFirst = 'WEB'
            } else if (pageSummary.email) {
                firstInfo = <span className={classes.InfoEntry}>{pageSummary.email}</span>
                firstInfoIcon = <Email fill='rgba(0,0,0,0.5)'/>
                markFirst = 'EMAIL'
            } else if (pageSummary.location && pageSummary.location.address) {
                firstInfo = <span className={classes.InfoEntry}>{pageSummary.location.address}</span>
                firstInfoIcon = <Pin fill='rgba(0,0,0,0.5)'/>
                markFirst = 'LOCATION'
            } else {
                markFirst = 'NONE'
            }
        }
        pageDescriptionBlock = (
            <div className={classes.PageDescriptionBlock}>
                {pageCategory}
                {pageDescription}
            </div>
        )
    }

    if (firstInfo && firstInfoIcon) {
        firstInfoEntry = <div className={classes.InfoEntryContainer}><div className={classes.InfoIcon}>{firstInfoIcon}</div>{firstInfo}</div>
    }

    let secondInfo;
    let secondInfoIcon;
    if (!userType) {
        if (props.profile) {
            if (props.profile.friends && props.profile.friends.length && markFirst !== 'FRIENDS') {
                secondInfo = `Became friends with ${props.profile.friends[props.profile.friends.length - 1].name}`
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
    } else if (userType === 'PAGE' && markFirst !== 'NONE') {
        if (pageSummary) {
            if (pageSummary.email && markFirst !== 'EMAIL') {
                secondInfo = <span className={[classes.InfoEntry, classes.ClickableEntry].join(" ")}>{pageSummary.email}</span>
                secondInfoIcon = <Email fill='rgba(0,0,0,0.5)'/>
            } else if (pageSummary.location && markFirst !== 'LOCATION') {
                secondInfo = <span className={classes.InfoEntry}>{pageSummary.location && pageSummary.location.address}</span>
                secondInfoIcon = <Pin fill='rgba(0,0,0,0.5)'/>
            }
        }
    }

    let secondInfoEntry;
    let addRepositionOffset = 0;
    if (secondInfo && secondInfoIcon) {
        secondInfoEntry = <div className={[classes.InfoEntryContainer, classes.SecondInfoEntry].join(" ")}><div className={classes.InfoIcon}>{secondInfoIcon}</div>{secondInfo}</div>
        addRepositionOffset = 30
    }

    let isFriendsOptions;
    if (viewingIsFriendsOptions) {
        isFriendsOptions = <IsFriendOptions />
    };

    let addFriendButtonText;
    let addFriendButtonIcon;
    let addFriendButtonClasses = [classes.ControlButton, classes.FirstControl, classes.AddFriendButton];
    let addFriendButtonAction;
    if (!userType) {
        if (props.profile) {
            if (friendRequestSent || (props.mySentRequests && props.mySentRequests.findIndex(req => req.publicProfileKey === publicProfileKey) !== -1)) {
                addFriendButtonText = 'Cancel Request';
                addFriendButtonIcon = <UnFriend fill='#155fe8'/>
                addFriendButtonAction = cancelFriendRequest;
            }

            if (!friendRequestSent && (props.mySentRequests && props.mySentRequests.findIndex(req => req.publicProfileKey === publicProfileKey) === -1) || friendRequestCanceled || deniedRequest) {
                addFriendButtonText = 'Add Friend';
                addFriendButtonIcon = <AddFriend fill='#155fe8'/>
                addFriendButtonAction = sendFriendRequest;
            }

            if (props.myReceivedRequests && props.myReceivedRequests.findIndex(req => req.publicProfileKey === publicProfileKey) !== -1) {
                addFriendButtonText = 'Respond'
                addFriendButtonIcon = <RespondRequest fill='#155fe8'/>
                addFriendButtonAction = () => setRespondingRequest(true)
            }
        }
    }

    let liked;
    let likeIconFill;
    let likeButtonText;
    let likeButtonAction;
    let likeButtonClasses = [classes.ControlButton, classes.FirstControl]
    if (userType === 'PAGE') {
        if (myPublicProfile && pageSummary) {
            if (myPublicProfile.likes && myPublicProfile.likes.pages ) {
                liked = myPublicProfile.likes.pages.find(like => like.dbKey === pageSummary.dbKey)
            }
        }
        if (liked || likedPage) {
            likeButtonText = 'Liked';
            likeButtonAction = cancelLike;
            likeButtonClasses.push(classes.AddFriendButton);
            likeIconFill = "#155fe8"
        } else {
            likeButtonText = 'Like';
            likeButtonAction = likePage;
        }
    }

    if (props.sendingRequest || props.cancelingRequest) {
        addFriendButtonIcon = <Spinner bottom={'53px'} right={"3px"}/>
    }

    let respondRequestDropdown;
    if (respondingRequest && addFriendButtonText === 'Respond') {
        respondRequestDropdown = (
            <OutsideAlerter action={() => setRespondingRequest(false)}>
                <RespondRequestDropdown senderKey={publicProfileKey} recipientKey={props.myPublicProfileKey} accept={setAcceptedRequest} deny={setDeniedRequest} close={() => setRespondingRequest(false)}/>
            </OutsideAlerter>
        )
    }

    let isFriend;
    let firstControl;
    let secondControl;
    if (!userType) {
        if (props.profile) {
            if (props.profile.userKey !== props.firebaseKey) {
                if (props.myFriends && props.myFriends.length) {
                    isFriend = props.myFriends.find(friend => friend.userKey === props.profile.userKey) || null;
                } else {
                    isFriend = null;
                }
                if (isFriend || acceptedRequest) {
                    firstControl = <div className={[classes.ControlButton, classes.FirstControl].join(" ")} onClick={startChat}>
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
                    firstControl = (
                        <React.Fragment>
                            <div className={addFriendButtonClasses.join(" ")} onClick={addFriendButtonAction}>
                                <div className={[classes.ButtonIcon, classes.AddFriendIcon].join(" ")}>
                                    {addFriendButtonIcon}
                                </div>
                                <span className={classes.ControlButtonText}>{addFriendButtonText}</span>
                            </div>
                            {respondRequestDropdown}
                        </React.Fragment>
                    )

                    if (props.profile.privacy.AllowMessages === 'ALL') {
                        secondControl =
                            <div className={classes.ControlButton} onClick={startChat}>
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
                firstControl = <div className={[classes.ControlButton, classes.FirstControl].join(" ")}>
                    <div className={[classes.ButtonIcon, classes.EditProfileIcon].join(" ")}><Pen/></div>
                    <span className={classes.ControlButtonText}>Edit Profile</span></div>
                secondControl = <div className={classes.ControlButton}>
                    <div className={classes.ButtonIcon}><Eye/></div>
                </div>
            }
        }
    } else if (userType === 'PAGE') {
        if (pageSummary && myPublicProfile) {
            firstControl = <div className={likeButtonClasses.join(" ")} onClick={likeButtonAction}>
                <div className={[classes.ButtonIcon, classes.LikeIcon].join(" ")}><Like fill={likeIconFill} /></div>
                <span className={classes.ControlButtonText}>{likeButtonText}</span></div>
                secondControl = <div className={classes.ControlButton}><div className={classes.ButtonIcon}><FbMessage/></div></div>
        }
    }

    let moreOptions;
    let moreOptionsText;
    let moreOptionsIcon;
    let moreOptionsAction;
    if (!userType) {
        if (props.profile) {
            if (props.firebaseKey === props.profile.userKey) {
                moreOptionsText = 'Activity Log'
                moreOptionsIcon = <ActivityLog/>
                // moreOptionsAction =
            } else {
                moreOptionsText = 'Block'
                moreOptionsIcon = <BlockUser/>
                // moreOptionsAction =
            }
            if (viewingMoreOptions) {
                moreOptions = (
                    <div className={dropdownClasses.Container} style={{height: "50px"}}>
                        <div className={dropdownClasses.Option} onClick={moreOptionsAction}>
                            <div className={dropdownClasses.OptionIcon}>{moreOptionsIcon}</div>
                            <span className={dropdownClasses.OptionText}>{moreOptionsText}</span>
                        </div>
                    </div>
                )
            }
        }
    }

    let userName;
    let profileImage;
    if (!userType) {
        if (props.profile) {
            userName = `${props.profile.firstName} ${props.profile.lastName}`
            profileImage = props.profile.profileImage
        }
    } else if (userType === 'PAGE') {
        if (pageSummary) {
            userName = pageSummary.name
            profileImage = pageSummary.profileImage
        }
    }

    let controlsSection;
    if (props.profile) {
        if (!userType && props.profile.userKey !== props.firebaseKey) {
            if (isFriend !== null && typeof(isFriend) !== 'object') {
                controlsSection = <InlineDots />
            } else {
                controlsSection =
                    (
                        <section className={classes.ControlsSection}>
                            {firstControl}
                            {secondControl}
                            <OutsideAlerter action={() => setViewingMoreOptions(false)}>
                                <div className={classes.ControlButton} onClick={() => setViewingMoreOptions(true)}><div className={[classes.ButtonIcon, classes.DotsIcon].join(" ")}><Dots /></div></div>
                                {moreOptions}
                            </OutsideAlerter>
                        </section>
                    )

            }
        } else if (props.profile.userKey === props.firebaseKey) {
            controlsSection =
                (
                    <section className={classes.ControlsSection}>
                        {firstControl}
                        {secondControl}
                        <OutsideAlerter action={() => setViewingMoreOptions(false)}>
                            <div className={classes.ControlButton} onClick={() => setViewingMoreOptions(true)}><div className={[classes.ButtonIcon, classes.DotsIcon].join(" ")}><Dots /></div></div>
                            {moreOptions}
                        </OutsideAlerter>
                    </section>
                )
        }
    } else if (userType === 'PAGE') {
        if (pageSummary && myPublicProfile) {
            controlsSection =
                (
                    <section className={classes.ControlsSection}>
                        {firstControl}
                        {secondControl}
                        <OutsideAlerter action={() => setViewingMoreOptions(false)}>
                            <div className={classes.ControlButton} onClick={() => setViewingMoreOptions(true)}>
                                <div className={[classes.ButtonIcon, classes.DotsIcon].join(" ")}><Dots/></div>
                            </div>
                            {moreOptions}
                        </OutsideAlerter>
                    </section>
                )
        }
    }

    let summary;

    if (props.fetchingPublicProfile || props.fetchingPageSummary) {
        summary = <InlineDots top="35%"/>
    } else {
        summary = <React.Fragment>
            <section className={classes.HeaderContainer}
            >
                <div className={classes.ProfileImageBlock}>
                    <div className={classes.ProfileImage} style={{backgroundImage: profileImage ? `url(${profileImage})`: null}} onClick={goToFullProfile}>
                        {profileImage ? null : <Avatar />}
                    </div>
                </div>
                <div className={classes.UserInfoContainer}>
                    <div className={classes.NameContainer}>
                        <div className={classes.UserName}>{userName}</div>
                        {pageDescriptionBlock}
                    </div>
                    {firstInfoEntry}
                    {secondInfoEntry}
                </div>
            </section>
            {controlsSection}
        </React.Fragment>
    }

    const friendDefaults = {bottom: `1px`, left: `${-.21 * width <= 150 ? -.21 * width : -.1 * width}px`}
    const postDefaults = {top: `${-205 - addRepositionOffset}px`, left: '-55px'}

    let friendAdjusted;
    let postAdjusted;
    if (adjustTop) {
        friendAdjusted =  {bottom: `${.5 * width <= 300 ? -.5 * width : .5 * width > 300 && .5 * width <= 400 ? -400 : -450}px`, left: `${-.21 * width <= 200 ? -.21 * width : -.1 * width}px`}
        postAdjusted = {top: '22px', left: '-55px'}
    }

    let defaults;
    let adjusted;
    let style;
    if (props.loc === 'FRIEND') {
        defaults = friendDefaults;
        adjusted = friendAdjusted;
    } else if (props.loc === 'POST') {
        defaults = postDefaults;
        adjusted = postAdjusted;
    }

    if (props.loc === 'FRIEND') {
        if (adjustTop || adjustBottom || adjustRight || adjustLeft) {
            style = adjusted;
        } else {
            style = defaults;
        }
    }

    if (props.loc === 'POST') {
        if (adjustTop || adjustBottom) {
            style = adjusted;
        } else {
            style = defaults;
        }
    }


    return (
        <div className={classes.Positioner} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
        <div className={classes.DropdownContainer} ref={container}
             style={style}
        >
            {summary}
        </div>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        profile: state.users.profileSummary,
        fetchingPublicProfile: state.users.loadingProfileSummary,
        pageSummary: state.pages.pageSummary,
        fetchingPageSummary: state.pages.fetchingPageSummary,
        firebaseKey: state.profile.firebaseKey,
        myPublicProfileKey: state.profile.publicProfileKey,
        myPublicProfile: state.profile.publicProfile,
        mySentRequests: state.friends.sentRequests,
        myReceivedRequests: state.friends.receivedRequests,
        sendingRequest: state.friends.sendingFriendRequest,
        cancelingRequest: state.friends.cancelingFriendRequest,
        myFriends: state.friends.friends,
        ownedPage: state.pages.ownedPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPublicProfile: (authToken,publicProfileKey, type) => dispatch(actions.fetchPublicProfileAttempt(authToken,publicProfileKey, type)),
        onFetchMyPublicProfile: (authToken, publicProfileKey) => dispatch(actions.fetchMyPublicProfileAttempt(authToken, publicProfileKey)),
        onSendFriendRequest: (authToken, senderKey, recipientKey) => dispatch(actions.sendFriendRequestAttempt(authToken, senderKey, recipientKey)),
        onCancelFriendRequest: (authToken, senderKey, recipientKey) => dispatch(actions.cancelFriendRequestAttempt(authToken, senderKey, recipientKey)),
        onLikePage: (authToken, newPage, newProfile, profileKey) => dispatch(actions.likePageAttempt(authToken, newPage, newProfile, profileKey)),
        onFetchMyFriendRequests: (authToken, publicProfileKey) => dispatch(actions.fetchFriendRequestsAttempt(authToken, publicProfileKey)),
        onFetchMyFriends: (authToken, publicProfileKey) => dispatch(actions.fetchFriendsAttempt(authToken,publicProfileKey)),
        onFetchPageSummary: (authToken, pageKey) => dispatch(actions.fetchPageSummaryAttempt(authToken, pageKey)),
        onClearProfileSummary: () => dispatch(actions.clearProfileSummary()),
        onClearPageSummary: () => dispatch(actions.clearPageSummary())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(profileSummaryDropdown));