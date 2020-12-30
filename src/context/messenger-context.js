
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

    const {myPublicProfile, activeChat} = props
    const [showMessenger, setShowMessenger] = useState(false);

    useEffect(() => {
        console.log(activeChat)
    })

    const openMessenger = () => {
        setShowMessenger(true);
    }

    const closeMessenger = () => {
        setShowMessenger(false);
    }

    const startChat = (otherPartyProfile) => {
        let existingChat;
        if (myPublicProfile && myPublicProfile.chats) {
            existingChat = myPublicProfile.chats[otherPartyProfile.userKey]
            if (existingChat) {
                console.log('restarting...')
                props.onRestartChat(props.authToken, existingChat);
            }
        } else {
            console.log('starting new...')
            props.onStartNewChat(props.authToken, props.myPublicProfile, otherPartyProfile)
        }
        openMessenger();
    }

    const sendMessage = (payload) => {
        if (props.activeChat) {
            const message = {
                userKey: myPublicProfile.userKey,
                message: payload,
                date: new Date()
            }
            props.onSendMessage(props.authToken, props.activeChat.key, message)
        }
    }

    return (
        <MessengerContext.Provider value={{showMessenger:showMessenger, openMessenger: openMessenger, closeMessenger: closeMessenger, startChat: startChat}}>
            {props.children}
        </MessengerContext.Provider>
    )
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        myPublicProfile: state.profile.publicProfile,
        otherProfile: state.users.fullProfile,
        activeChat: state.messenger.activeChat
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRestartChat: (authToken, chatKey) => dispatch(actions.restartOldChatAttempt(authToken, chatKey)),
        onStartNewChat: (authToken, myProfile, theirProfile) => dispatch(actions.startNewChatAttempt(authToken, myProfile, theirProfile)),
        onSendMessage: (authToken, chatKey, message) => dispatch(actions.sendMessageAttempt(authToken, chatKey, message)),
        onFetchActiveChat: (authToken) => dispatch(actions.fetchActiveChatAttempt(authToken)),
        onClearActiveChat: (authToken) => dispatch(actions.clearActiveChatAttempt(authToken)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(messengerContextProvider);