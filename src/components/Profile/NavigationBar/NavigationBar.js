import React, {useState, useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import classes from './NavigationBar.css';
import NavDropdown from './NavigationDropdown/NavigationDropdown';
import {EditProfileContext} from "../../../context/edit-profile-context";
import {MessengerContext} from "../../../context/messenger-context";
import {ViewAsContext} from "../../../context/view-as-context";

import Eye from '../../../assets/images/eye';
import Pen from '../../../assets/images/edit';
import FbMessage from '../../../assets/images/UserActionIcons/fbMessage';
import Search from '../../../assets/images/search';
import ActivityLog from '../../../assets/images/UserActivityIcons/activityLog';
import SearchGlass from '../../../assets/images/search';
import Block from '../../../assets/images/UserActionIcons/blockUser';
import AddFriend from '../../../assets/images/UserActionIcons/addFriend';
import Follow from '../../../assets/images/UserActionIcons/follow';
import Dots from '../../../assets/images/dots';
import DownArrow from '../../../assets/images/down-arrow';
import UnFriend from "../../../assets/images/UserActionIcons/unfriend";

import Label from '../../UI/Label/Label';
import Spinner from "../../UI/Spinner/Spinner";
import InlineDots from '../../UI/Spinner/InlineDots';
import RespondRequest from "../../../assets/images/UserActionIcons/respondRequest";
import RespondRequestDropdown from "../../Users/Dropdowns/RespondRequest/RespondRequest";

import OutsideAlerter from "../../../hooks/outsideClickHandler";
import getWindowDimensions from "../../../hooks/getWindowDimensions";
import * as actions from "../../../store/actions";


const navigationBar = (props) => {

    const [viewAsFlag, setViewAsFlag] = useState(props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1])
    const [showNavDropdown, setShowNavDropdown] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [isFriend, setIsFriend] = useState(null);
    const [friendRequestSent, setFriendRequestSent] = useState(false);
    const [friendRequestCanceled, setFriendRequestCanceled] = useState(false);
    const [respondingRequest, setRespondingRequest] = useState(false);
    const [acceptedRequest, setAcceptedRequest] = useState(false);
    const [deniedRequest, setDeniedRequest] = useState(false);

    const {width, height} = getWindowDimensions()
    const { myPublicProfile, otherProfile, otherPublicProfile, myFriends, acceptingRequest, sendingRequest, cancelingRequest, denyingRequest } = props
    const editProfileContext = useContext(EditProfileContext);
    const messengerContext = useContext(MessengerContext);
    const viewAsContext = useContext(ViewAsContext);


    useEffect(() => {
        if (props.displayProfile !== 'me') {
            if (myPublicProfile && otherProfile) {
                if (myPublicProfile.friends) {
                    setIsFriend(myPublicProfile.friends.find(friend => friend.userKey === otherProfile.userKey))
                }
            }
        }
    }, [myPublicProfile,otherProfile])

    useEffect(() => {
        if (myFriends && otherProfile && props.displayProfile !== 'me') {
            setIsFriend(myFriends.find(friend => friend.userKey === otherProfile.userKey))
        }
    }, [myFriends, otherProfile])

    useEffect(() => {
        setTimeout(() => {
            props.onFetchMyFriendRequests(props.authToken,props.myPublicProfileKey);
        }, 2000)
    }, [sendingRequest, cancelingRequest, acceptingRequest, denyingRequest])

    useEffect(() => {
        props.onFetchMyFriendRequests(props.authToken,props.myPublicProfileKey);
    }, [friendRequestCanceled])

    useEffect(() => {
        props.onFetchMyFriendRequests(props.authToken,props.myPublicProfileKey);
    }, [sendingRequest])

    useEffect(() => {
        props.onFetchMyFriends(props.authToken, props.myPublicProfileKey)
    }, [acceptedRequest])


    const viewAs = () => {
        props.history.push(`/user-profile/${props.firebaseKey}/view-as`)
        viewAsContext.openModal()
    }

    const sendFriendRequest = () => {
        if (otherProfile && props.myPublicProfileKey) {
            props.onSendFriendRequest(props.authToken, props.myPublicProfileKey, otherProfile.publicProfileKey)
            setFriendRequestSent(true)
            if (friendRequestCanceled) {
                setFriendRequestCanceled(false)
            }
        }
    }

    const cancelFriendRequest = () => {
        if (otherProfile && props.myPublicProfileKey) {
            props.onCancelFriendRequest(props.authToken, props.myPublicProfileKey, otherProfile.publicProfileKey)
            setFriendRequestCanceled(true);
            setFriendRequestSent(false);
        }
    }

    const toggleNavDropdown = () => {
        setShowNavDropdown(prevState => {
            return !prevState;
        });
    }

    const closeNavDropdown = () => {
        setShowNavDropdown(false);
    }

    const startChat = () => {
        if (otherPublicProfile) {
            messengerContext.startChat(otherPublicProfile, 'USER', 'USER')
        }
    }

    let navDropdown;
    if (showNavDropdown) {
        navDropdown = <NavDropdown pathRoot={props.pathRoot} displayProfile={props.displayProfile} />
    }

    const moreTabClasses = [classes.MoreTab]
    let moreFill;
    if (width < 859 && props.location.pathname === `/user-profile/${props.displayProfile}/photos` || width < 1160 && props.location.pathname === `/friends/${props.displayProfile}/photos`) {
        if (props.location.pathname === `/${props.pathRoot}/${props.displayProfile}/photos` ) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true;
        }
    }

    if (width < 777) {
        if (props.location.pathname === `/user-profile/${props.displayProfile}/friends` || props.location.pathname === `/user-profile/${props.displayProfile}/photos`) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true
        }
    }
    if (width < 1035) {
        if (props.location.pathname === `/friends/${props.displayProfile}/friends` || props.location.pathname === `/friends/${props.displayProfile}/photos`) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true
        }
    }

    if (width < 664) {
        if ( props.location.pathname === `/user-profile/${props.displayProfile}/about` || props.location.pathname === `/user-profile/${props.displayProfile}/friends` || props.location.pathname === `/user-profile/${props.displayProfile}/photos`) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true;
        }
    }
    if (width < 940) {
        if (props.location.pathname === `/friends/${props.displayProfile}/about` || props.location.pathname === `/friends/${props.displayProfile}/friends` || props.location.pathname === `/friends/${props.displayProfile}/photos`) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true;
        }
    }

    if (width < 840) {
        if (props.location.pathname === `/friends/${props.displayProfile}`) {
            moreTabClasses.push(classes.ActiveMoreTab);
            moreFill = true;
        }
    }

    let addFriendButtonText;
    let addFriendButtonIcon;
    let addFriendButtonAction;
    if (otherProfile) {
        if (friendRequestSent || sendingRequest || (props.mySentRequests && props.mySentRequests.findIndex(req => req.publicProfileKey === otherProfile.publicProfileKey) !== -1)) {
            addFriendButtonText = 'Cancel Request';
            addFriendButtonIcon = <UnFriend fill='#155fe8'/>
            addFriendButtonAction = cancelFriendRequest;
        }

        if (!friendRequestSent && (props.mySentRequests && props.mySentRequests.findIndex(req => req.publicProfileKey === otherProfile.publicProfileKey) === -1) || friendRequestCanceled || deniedRequest) {
            addFriendButtonText = 'Add Friend';
            addFriendButtonIcon = <AddFriend fill='#155fe8'/>
            addFriendButtonAction = sendFriendRequest;
        }

        if (props.myReceivedRequests && props.myReceivedRequests.findIndex(req => req.publicProfileKey === otherProfile.publicProfileKey) !== -1) {
            addFriendButtonText = 'Respond'
            addFriendButtonIcon = <RespondRequest fill='#155fe8'/>
            addFriendButtonAction = () => setRespondingRequest(true)
        }
    }

    let respondRequestDropdown;
    if (respondingRequest && addFriendButtonText === 'Respond') {
        if (otherProfile) {
            respondRequestDropdown = (
                <OutsideAlerter action={() => setRespondingRequest(false)}>
                    <RespondRequestDropdown senderKey={otherProfile.publicProfileKey} recipientKey={props.myPublicProfileKey}
                                            accept={setAcceptedRequest} deny={setDeniedRequest}
                                            close={() => setRespondingRequest(false)}/>
                </OutsideAlerter>
            )
        }
    }

    if (sendingRequest || cancelingRequest || acceptingRequest || denyingRequest) {
        addFriendButtonIcon = <Spinner bottom={'60px'} right={"3px"}/>
    }

    let firstEditButton;
    let secondEditButton;
    let thirdEditButton;
    let moreOptions;
    if (props.displayProfile === 'me') {
        firstEditButton =  <li className={[classes.EditControl, classes.FirstControlButton].join(" ")} onClick={editProfileContext.openEditModal}><div className={classes.EditProfileButtonIcon}><Pen /></div>Edit Profile</li>

        secondEditButton = (
            <Label label="View As" bottom="50px" left="3px" backgroundColor="rgba(0,0,0,0.7)">
                <li className={classes.EditControl} onClick={viewAs}><div className={classes.EditControlIcon}><Eye /></div></li>
            </Label>
        )
        thirdEditButton =  (
            <Label label="Search Profile" bottom="50px" width="80px" right="-14px" backgroundColor="rgba(0,0,0,0.7)">
                <li className={classes.EditControl}><div className={classes.EditControlIcon}><Search /></div></li>
            </Label>
        )
        moreOptions = (
                <div className={classes.MoreOptionsDropdownButton}><div className={classes.MoreOptionsIcon}><ActivityLog /></div>Activity Log</div>
        )
    } else {
        if (myPublicProfile && otherProfile && otherPublicProfile) {
            if (isFriend) {
                firstEditButton =
                    (
                        <li className={[classes.EditControl, classes.FirstControlButton].join(" ")} onClick={startChat}>
                            <div className={classes.MessageUserButtonIcon}><FbMessage/></div>
                            Message
                        </li>
                    )
            } else {
                firstEditButton = (
                    <React.Fragment>
                        <li className={classes.AddFriendControlButton} onClick={addFriendButtonAction}>
                            <div className={classes.AddFriendButtonIcon}>{addFriendButtonIcon}</div>
                        {addFriendButtonText}
                        </li>
                        {respondRequestDropdown}
                    </React.Fragment>
                        )

                if (otherPublicProfile.privacy.AllowMessages === 'ALL') {
                    secondEditButton = <li className={classes.EditControl} onClick={startChat}>
                        <div className={classes.EditControlIcon}><FbMessage/></div>
                    </li>
                    if (otherPublicProfile.privacy.AllowFollowers) {
                        thirdEditButton = <li className={classes.EditControl}>
                            <div className={classes.EditControlIcon}><Follow/></div>
                        </li>
                    }
                } else {
                    secondEditButton = <li className={classes.EditControl}>
                        <div className={classes.EditControlIcon}><Follow/></div>
                    </li>
                }

            }
        }

        moreOptions = (
            <React.Fragment>
                <div className={classes.MoreOptionsDropdownButton}><div className={classes.MoreOptionsIcon}><SearchGlass /></div>Search Profile</div>
                <div className={classes.MoreOptionsDropdownButton}><div className={classes.MoreOptionsIcon}><Block /></div>Block</div>
            </React.Fragment>
        )
    }

    let moreOptionsDropdown;
    if (showMoreOptions) {
        moreOptionsDropdown = (
                <div className={classes.MoreOptionsDropdown} style={{padding: props.displayProfile === 'me' ? '2px 0' : null}}>
                    <div className={classes.BaseArrow} style={{bottom: props.displayProfile === 'me' ? '53px' : null}}/>
                    {moreOptions}
                </div>
        )
    }

    let editControls;
    if (props.displayProfile === 'me') {
        editControls = (
            <ul className={classes.EditControls}>
                {firstEditButton}
                {secondEditButton}
                {thirdEditButton}
                <OutsideAlerter action={() => setShowMoreOptions(false)}>
                    <li className={classes.EditControl} style={{backgroundColor: showMoreOptions ? 'rgba(0,0,0,0.15)': null}}onClick={() => setShowMoreOptions(prevState => {return !prevState})}><div className={[classes.EditControlIcon, classes.DotsIcon].join(" ")}><Dots /></div></li>
                    {moreOptionsDropdown}
                </OutsideAlerter>
            </ul>
        )
    } else if (props.displayProfile !== 'me' && viewAsFlag !== 'view-as') {
        if (myPublicProfile && otherPublicProfile && otherProfile) {
            editControls = (
                <ul className={classes.EditControls}>
                    {firstEditButton}
                    {secondEditButton}
                    {thirdEditButton}
                    <OutsideAlerter action={() => setShowMoreOptions(false)}>
                        <li className={classes.EditControl}
                            style={{backgroundColor: showMoreOptions ? 'rgba(0,0,0,0.15)' : null}}
                            onClick={() => setShowMoreOptions(prevState => {
                                return !prevState
                            })}>
                            <div className={[classes.EditControlIcon, classes.DotsIcon].join(" ")}><Dots/></div>
                        </li>
                        {moreOptionsDropdown}
                    </OutsideAlerter>
                </ul>
            )
        }
    } else if (props.displayProfile !== 'me' && viewAsFlag === 'view-as') {
        if (myPublicProfile && otherPublicProfile && otherProfile) {
            editControls = (
                    <ul className={classes.EditControls}>
                        <li className={[classes.EditControl, classes.FirstControlButton, classes.EditControlDisabled].join(" ")}>
                            <div className={classes.AddFriendButtonIcon}><AddFriend fill='rgba(0,0,0,0.3)'/></div>
                            {addFriendButtonText}
                        </li>
                        <li className={[classes.EditControl, classes.EditControlDisabled].join(" ")}>
                            <div className={classes.EditControlIcon}><FbMessage fill="rgba(0,0,0,0.3)"/></div>
                        </li>
                        <Label label="Search Profile" bottom="50px" width="80px" right="-14px" backgroundColor="rgba(0,0,0,0.7)">
                            <li className={[classes.EditControl, classes.EditControlDisabled].join(" ")}><div className={classes.EditControlIcon}><Search fill="rgba(0,0,0,0.3)"/></div></li>
                        </Label>
                        <OutsideAlerter action={() => setShowMoreOptions(false)}>
                            <li className={[classes.EditControl, classes.EditControlDisabled].join(" ")}>
                                <div className={[classes.EditControlIcon, classes.DotsIcon].join(" ")}><Dots fill="rgba(0,0,0,0.3)"/></div>
                            </li>
                            {moreOptionsDropdown}
                        </OutsideAlerter>
                    </ul>
            )
        }
    }

    if (props.fetchingMyPublicProfile || props.fetchingOtherPublicProfile || props.fetchingOtherProfile) {
        editControls = <InlineDots />
    }

    return (
            <React.Fragment>
            <div className={classes.Break} />
            <section className={classes.NavigationBar}>
                <nav>
                    <ul className={classes.TabControls}>
                        {  props.pathRoot === 'friends' && width >= 840  || props.pathRoot === 'user-profile' && width >= 588 ? <div className={classes.TimelineTab}>
                            <NavLink
                                exact
                                to={viewAsContext.viewingAs ? `/${props.pathRoot}/${props.displayProfile}/${viewAsFlag}` : `/${props.pathRoot}/${props.displayProfile}`}
                                activeClassName={classes.active}
                            >{props.displayProfile === 'me' ? 'Timeline' : 'Posts'}
                            </NavLink>
                        </div> : null }
                        {  props.pathRoot === 'friends' && width >= 940 || props.pathRoot === 'user-profile' && width >= 664 ? <div className={classes.AboutTab}>
                            <NavLink
                                to={viewAsContext.viewingAs ? `/${props.pathRoot}/${props.displayProfile}/about/${viewAsFlag}`: `/${props.pathRoot}/${props.displayProfile}/about`}
                                activeClassName={classes.active}
                            >About
                            </NavLink>
                        </div> : null }
                        {  props.pathRoot === 'friends' && width >= 1035 || props.pathRoot === 'user-profile' && width >= 777 ? <div className={classes.FriendsTab}>
                            <NavLink
                                to={ viewAsContext.viewingAs ? `/${props.pathRoot}/${props.displayProfile}/friends/${viewAsFlag}` : `/${props.pathRoot}/${props.displayProfile}/friends`}
                                activeClassName={classes.active}
                            >Friends
                            </NavLink>
                        </div> : null }
                        {  props.pathRoot === 'friends' && width >= 1160 || props.pathRoot === 'user-profile' && width >=  859 ? <div className={classes.PhotosTab}>
                            <NavLink
                                to={viewAsContext.viewingAs ? `/${props.pathRoot}/${props.displayProfile}/photos/${viewAsFlag}` : `/${props.pathRoot}/${props.displayProfile}/photos`}
                                activeClassName={classes.active}
                            >Photos
                            </NavLink>
                        </div> : null }
                        <div className={moreTabClasses.join(" ")} onClick={toggleNavDropdown}>
                            <div
                            >More
                            </div>
                            <div className={classes.MoreArrowContainer}>
                                <DownArrow fill={moreFill ? '#1665f7' : null} />
                            </div>
                        </div>
                        <div className={classes.MoreTabBlockPositioner}>
                            <div className={classes.MoreTabBlocker} style={{display: showNavDropdown ? 'block' : 'none'}}/>
                            <OutsideAlerter action={closeNavDropdown}>
                                <div className={classes.DropdownNavPositioner}>
                                    {navDropdown}
                                </div>
                            </OutsideAlerter>
                        </div>
                    </ul>
                </nav>
                <nav>
                    {editControls}
                </nav>
            </section>
            </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        myPublicProfile: state.profile.publicProfile,
        myPublicProfileKey: state.profile.publicProfileKey,
        otherProfile: state.users.fullProfile,
        otherPublicProfile: state.users.singleProfile,
        fetchingMyPublicProfile: state.profile.publicProfileLoading,
        fetchingOtherProfile: state.users.loadingFullProfile,
        fetchingOtherPublicProfile: state.users.loadingSingleProfile,
        mySentRequests: state.friends.sentRequests,
        myReceivedRequests: state.friends.receivedRequests,
        sendingRequest: state.friends.sendingFriendRequest,
        cancelingRequest: state.friends.cancelingFriendRequest,
        acceptingRequest: state.friends.acceptingFriendRequest,
        denyingRequest: state.friends.denyingFriendRequest,
        myFriends: state.friends.friends
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSendFriendRequest: (authToken, senderKey, recipientKey) => dispatch(actions.sendFriendRequestAttempt(authToken, senderKey, recipientKey)),
        onCancelFriendRequest: (authToken, senderKey, recipientKey) => dispatch(actions.cancelFriendRequestAttempt(authToken, senderKey, recipientKey)),
        onFetchMyFriendRequests: (authToken, publicProfileKey) => dispatch(actions.fetchFriendRequestsAttempt(authToken, publicProfileKey)),
        onFetchMyFriends: (authToken, publicProfileKey) => dispatch(actions.fetchFriendsAttempt(authToken,publicProfileKey)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(navigationBar));