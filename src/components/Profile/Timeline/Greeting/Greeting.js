
import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import classes from './Greeting.css';
import AddFriend from '../../../../assets/images/UserActionIcons/addFriend';
import * as actions from "../../../../store/actions";
import UnFriend from "../../../../assets/images/UserActionIcons/unfriend";
import RespondRequest from "../../../../assets/images/UserActionIcons/respondRequest";
import OutsideAlerter from "../../../../hooks/outsideClickHandler";
import RespondRequestDropdown from "../../../Users/Dropdowns/RespondRequest/RespondRequest";
import Spinner from '../../../UI/Spinner/Spinner';

const greeting = props => {

    const [viewAsFlag, setViewAsFlag] = useState(props.history.location.pathname.split('/')[props.history.location.pathname.split('/').length - 1])
    const {authToken,myPublicProfile, myPublicProfileKey, otherProfile, otherPublicProfile} = props
    const [friendRequestSent, setFriendRequestSent] = useState(false);
    const [friendRequestCanceled, setFriendRequestCanceled] = useState(false);
    const [respondingRequest, setRespondingRequest] = useState(false);
    const [acceptedRequest, setAcceptedRequest] = useState(false);
    const [deniedRequest, setDeniedRequest] = useState(false);


    useEffect(() => {
        if (authToken && myPublicProfileKey) {
            props.onFetchMyFriendRequests(authToken,myPublicProfileKey);
        }
    }, [friendRequestCanceled])

    useEffect(() => {
        if (authToken && myPublicProfileKey) {
            props.onFetchMyFriends(authToken, myPublicProfileKey)
        }
    }, [acceptedRequest])

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

    let mutualFriends;
    let mutualFriendsSection;

    let ButtonText;
    let ButtonIcon;
    let ButtonAction;
    let iconFill = viewAsFlag === 'view-as' ? 'rgba(0,0,0,0.1)' : 'white'
    if (otherProfile) {
        if (friendRequestSent || (props.mySentRequests && props.mySentRequests.findIndex(req => req.publicProfileKey === otherProfile.publicProfileKey) !== -1)) {
            ButtonText = 'Cancel Request';
            ButtonIcon = <UnFriend fill={iconFill} />
            ButtonAction = cancelFriendRequest;
        }

        if (!friendRequestSent && (props.mySentRequests && props.mySentRequests.findIndex(req => req.publicProfileKey === otherProfile.publicProfileKey) === -1) || friendRequestCanceled || deniedRequest) {
            ButtonText = 'Add Friend';
            ButtonIcon = <AddFriend fill={iconFill} />
            ButtonAction = sendFriendRequest;
        }

        if (props.myReceivedRequests && props.myReceivedRequests.findIndex(req => req.publicProfileKey === otherProfile.publicProfileKey) !== -1) {
            ButtonText = 'Respond'
            ButtonIcon = <RespondRequest fill={iconFill} />
            ButtonAction = () => setRespondingRequest(true)
        }
    }

    if (props.sendingRequest || props.acceptingRequest || props.cancelingRequest || props.denyingRequest) {
        ButtonIcon = <Spinner bottom="59px"/>
    }

    let respondRequestDropdown;
    if (respondingRequest && ButtonText === 'Respond') {
        if (otherProfile) {
            respondRequestDropdown = (
                <OutsideAlerter action={() => setRespondingRequest(false)}>
                    <RespondRequestDropdown
                        senderKey={otherProfile.publicProfileKey}
                        recipientKey={props.myPublicProfileKey}
                        accept={setAcceptedRequest}
                        deny={setDeniedRequest}
                        close={() => setRespondingRequest(false)}
                        style={{top: "25px"}}
                        acceptRequest={props.acceptRequest}
                    />
                </OutsideAlerter>
            )
        }
    }

    return (
        <div className={classes.Container}>
            <div className={classes.LeftBlock}>
                <div className={classes.MainText}>{`Do you know ${otherPublicProfile.firstName}?`}</div>
                <div className={classes.SubText}>To see what they share with friends, send them a friend request.</div>
                {mutualFriendsSection}
            </div>
            <div className={[classes.Button, viewAsFlag === 'view-as' ? classes.DisabledButton : null].join(" ")} onClick={viewAsFlag !== 'view-as' ? ButtonAction : null}>
                <div className={classes.Icon}>{ButtonIcon}</div>
                <div className={classes.ButtonText}>{ButtonText}</div>
            </div>
            {respondRequestDropdown}
        </div>

    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        myPublicProfile: state.profile.publicProfile,
        myPublicProfileKey: state.profile.publicProfileKey,
        otherProfile: state.users.fullProfile,
        otherPublicProfile: state.users.singleProfile,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(greeting));