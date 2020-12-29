
import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';

export const MessengerContext = React.createContext({
    showMessenger: false,
    openMessenger: () => {},
    closeMessenger: () => {},
    startChat: () => {},
    closeChat: () => {},
    pauseChat: () => {},
    activeConversation: null,
    waitingConversations: null,
})

const messengerContextProvider = props => {

    const {myPublicProfile} = props
    const [showMessenger, setShowMessenger] = useState(true);
    const [activeConversation, setActiveConversation] = useState(null);
    const [waitingConversations, setWaitingConversations] = useState(null)

    const openMessenger = () => {
        setShowMessenger(true);
    }

    const closeMessenger = () => {
        setShowMessenger(false);
    }

    const startChat = (otherPartyProfile) => {
        let existingChat;
        if (myPublicProfile && myPublicProfile.chats) {
            existingChat = myPublicProfile.chats.find(chat => chat.userKey === otherPartyProfile.userKey)
            if (existingChat) {
                props.onRestartChat(props.authToken, existingChat.chatKey);
            } else {
                props.onStartNewChat(props.authToken, props.myPublicProfile, otherPartyProfile)
            }
        }


        openMessenger();
    }

    return (
        <MessengerContext.Provider value={{showMessenger:showMessenger, openMessenger: openMessenger, closeMessenger: closeMessenger}}>
            {props.children}
        </MessengerContext.Provider>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        myPublicProfile: state.profile.publicProfile,
        otherProfile: state.users.fullProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRestartChat: (authToken, chatKey) => dispatch(actions.restartOldChatAttempt(authToken, chatKey)),
        onStartNewChat: (authToken, myProfile, theirProfile) => actions.startNewChatAttempt(authToken, myProfile, theirProfile)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(messengerContextProvider);