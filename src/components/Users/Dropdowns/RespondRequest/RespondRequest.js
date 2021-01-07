
import React from 'react';
import classes from "../RespondRequest/RespondRequest.css";
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';

const respondRequestDropdown = props => {

    const acceptRequest = () => {
        props.onAcceptFriendRequest(props.authToken, props.senderKey, props.recipientKey);
        props.accept(true);
        props.close();
        if (props.acceptRequest) {
            props.acceptRequest();
        }
    }

    const denyRequest = () => {
        props.onDenyFriendRequest(props.authToken, props.senderKey, props.recipientKey);
        props.deny(true);
        props.close();
    }


    return (
         <div className={classes.RespondRequestDropdownPositioner} >
             <div className={classes.RespondButtonBlocker} onClick={props.close}/>
             <div className={classes.RespondRequestDropdown} style={props.style || null}>
                 <div className={classes.RespondRequestOption} onClick={acceptRequest}>
                     <span className={classes.RespondOptionText}>Confirm</span>
                 </div>
                 <div className={classes.RespondRequestOption} onClick={denyRequest}>
                     <span className={classes.RespondOptionText}>Delete Request</span>
                 </div>
             </div>
         </div>
     )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAcceptFriendRequest: (authToken, senderKey, recipientKey) => dispatch(actions.acceptFriendRequestAttempt(authToken, senderKey, recipientKey)),
        onDenyFriendRequest:  (authToken, senderKey, recipientKey) => dispatch(actions.denyFriendRequestAttempt(authToken, senderKey, recipientKey)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(respondRequestDropdown);