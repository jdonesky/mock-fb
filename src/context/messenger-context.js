
import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';

export const MessengerContext = React.createContext({
    showMessenger: false,
    openMessenger: () => {},
    closeMessenger: () => {},
    startChat: () => {},
    closeChat: () => {},
    retrieveChat: () => {},
    activeChat: null,
})

const messengerContextProvider = props => {

    const {authToken, myPublicProfile} = props
    const [activeChat, setActiveChat] = useState(null);
    const [showMessenger, setShowMessenger] = useState(false);

    const openMessenger = () => {
        setShowMessenger(true);
    }

    const closeMessenger = () => {
        setShowMessenger(false);
    }

    const startChat = (otherPartyProfile, type) => {
        let existingChat;
        if (myPublicProfile && myPublicProfile.chats) {
            if (type === 'PAGE') {
                existingChat = myPublicProfile.chats[otherPartyProfile.dbKey]
            } else {
                existingChat = myPublicProfile.chats[otherPartyProfile.userKey]
            }
            if (existingChat) {
                console.log('existingChat', existingChat)
                props.onRestartChat(authToken, props.firebaseKey, existingChat);
            }
        } else {
            props.onStartNewChat(authToken, props.myPublicProfile, otherPartyProfile, type)
        }
        openMessenger();
    }

    const retrieveChat = (chatKey) => {
        console.log('RETRIEVING CHAT', chatKey);
        props.onRestartChat(authToken, props.firebaseKey, chatKey)
        openMessenger();
    }

    const clearChat = () => {
        setActiveChat(null)
    }

    return (
        <MessengerContext.Provider value={{showMessenger:showMessenger, openMessenger: openMessenger, closeMessenger: closeMessenger, startChat: startChat, retrieveChat: retrieveChat, activeChat: activeChat}}>
            {props.children}
        </MessengerContext.Provider>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        myPublicProfile: state.profile.publicProfile,
        otherProfile: state.users.fullProfile,
        activeChat: state.profile.activeChat
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRestartChat: (authToken, userKey, chatKey) => dispatch(actions.restartOldChatAttempt(authToken, userKey, chatKey)),
        onStartNewChat: (authToken, myProfile, theirProfile, type) => dispatch(actions.startNewChatAttempt(authToken, myProfile, theirProfile, type)),
        onSendMessage: (authToken, chatKey, message) => dispatch(actions.sendMessageAttempt(authToken, chatKey, message)),
        onFetchActiveChat: (authToken) => dispatch(actions.fetchActiveChatAttempt(authToken)),
        onClearActiveChat: (authToken) => dispatch(actions.clearActiveChatAttempt(authToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(messengerContextProvider);