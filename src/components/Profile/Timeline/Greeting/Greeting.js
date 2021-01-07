
import React from 'react';
import {connect} from 'react-redux';
import classes from './Greeting.css';
import AddFriend from '../../../../assets/images/UserActionIcons/addFriend';
import * as actions from "../../../../store/actions";
import UnFriend from "../../../../assets/images/UserActionIcons/unfriend";
import RespondRequest from "../../../../assets/images/UserActionIcons/respondRequest";

const greeting = props => {

    const {myPublicProfile, myPublicProfileKey, otherProfile, otherPublicProfile} = props

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
    if (otherProfile) {
        if (friendRequestSent || (props.mySentRequests && props.mySentRequests.findIndex(req => req.publicProfileKey === otherProfile.publicProfileKey) !== -1)) {
            ButtonText = 'Cancel Request';
            ButtonIcon = <UnFriend fill='#155fe8'/>
            ButtonAction = cancelFriendRequest;
        }

        if (!friendRequestSent && (props.mySentRequests && props.mySentRequests.findIndex(req => req.publicProfileKey === otherProfile.publicProfileKey) === -1) || friendRequestCanceled || deniedRequest) {
            ButtonText = 'Add Friend';
            ButtonIcon = <AddFriend fill='#155fe8'/>
            ButtonAction = sendFriendRequest;
        }

        if (props.myReceivedRequests && props.myReceivedRequests.findIndex(req => req.publicProfileKey === otherProfile.publicProfileKey) !== -1) {
            ButtonText = 'Respond'
            ButtonIcon = <RespondRequest fill='#155fe8'/>
            ButtonAction = () => setRespondingRequest(true)
        }
    }

    return (
        <div className={classes.Container}>
            <div className={classes.LeftBlock}>
                <div className={classes.MainText}>{`Do you know ${otherPublicProfile.firstName}?`}</div>
                <div className={classes.SubText}>To see what they share with friends, send them a friend request.</div>
                {mutualFriendsSection}
            </div>
            <div className={classes.Button}>
                <div className={classes.Icon}><AddFriend fill="white" /></div>
                <div className={classes.ButtonText}>Add Friend</div>
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(greeting);