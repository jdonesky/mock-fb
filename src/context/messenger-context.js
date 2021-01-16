
import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';

export const MessengerContext = React.createContext({
    localActiveChat: null,
    showActiveChat: false,
    showMessenger: false,
    openMessenger: () => {},
    minimizeMessenger: () => {},
    closeMessenger: () => {},
    startChat: () => {},
    fetchActiveChat: () => {},
    clearActiveChat: () => {},
    resetMessengerStarter: false,
    retrieveChat: () => {},
    removeFromNewMessages: () => {}
})

const messengerContextProvider = props => {

    const [localActiveChat, setLocalActiveChat] = useState(null);
    const [showMessenger, setShowMessenger] = useState(false);
    const [showActiveChat, setShowActiveChat] = useState(true);
    const [resetMessenger, setResetMessenger] = useState(false);
    const {authToken, firebaseKey, myPublicProfile, ownedPage, onFetchActiveChat, onRemoveFromNewMessages, activeChat} = props

    useEffect(() => {
        if (authToken && firebaseKey) {
            onFetchActiveChat(authToken, props.firebaseKey);
        }
    }, [firebaseKey])

    useEffect(() => {
        if (activeChat) {
            setLocalActiveChat(activeChat)
        }
    }, [activeChat])

    const removeFromNewMessages = (myType, theirKey) => {
        let pathRoot;
        let key;
        switch (myType) {
            case 'USER':
                pathRoot = 'users';
                key = firebaseKey;
                break;
            case 'PAGE':
                pathRoot = 'pages';
                key = ownedPage && ownedPage.dbKey;
                break;
            default:
                pathRoot = 'users'
                key = firebaseKey;
        }
        onRemoveFromNewMessages(authToken, pathRoot, key, theirKey)
    }

    const fetchActiveChat = () => {
        if (authToken && props.firebaseKey) {
            onFetchActiveChat(authToken, props.firebaseKey);
        }
    }
    const retrieveChat = (chatKey) => {
        props.onRestartChat(authToken, props.firebaseKey, chatKey)
        openMessenger();
    }

    const clearActiveChat = () => {
        setShowMessenger(false);
        setLocalActiveChat(null);
        props.onClearActiveChat(props.authToken, props.firebaseKey)
        props.onClearLocalChatRecord();
        props.onClearLocalActiveChat();
    }

    const openMessenger = () => {
        setShowMessenger(true);
        setShowActiveChat(false);
    }

    let minimizeMessenger = () => {
        setShowMessenger(false);
        setShowActiveChat(true);
    }

    const closeMessenger = () => {
        setShowMessenger(false);
        setLocalActiveChat(null);
        setShowActiveChat(false);
    }

    const createNewChat = (myProfile, theirProfile, theirType, myType) => {
        let theirKey;
        let theirName;
        let myKey;
        let myName;
        if (theirType === 'PAGE') {
            theirKey = theirProfile.dbKey;
            theirName = theirProfile.name;
        } else {
            theirKey = theirProfile.userKey;
            theirName = theirProfile.firstName + ' ' + theirProfile.lastName;
        }

        if (myType === 'PAGE') {
            myKey = myProfile.dbKey;
            myName = myProfile.name;
        } else {
            myKey = myProfile.userKey;
            myName = myProfile.firstName + ' ' + myProfile.lastName
        }

        const newChat = {
            parties: [
                {name: myName, profileImage: myProfile.profileImage, userKey: myKey, type: myType},
                {name: theirName, profileImage: theirProfile.profileImage, userKey: theirKey, type: theirType}
            ],
            messages: [],
            startDate: new Date()
        }
        return newChat
    }

    const startChat = (theirProfile, theirType, myType) => {

        let myProfile;
        if (myType === 'PAGE' && props.ownedPage) {
            myProfile = props.ownedPage
        } else if (myType === 'USER' && myPublicProfile) {
            myProfile = myPublicProfile
        }

        let existingChat;
        if (myProfile && myProfile.chats) {
            if (theirType === 'PAGE') {
                existingChat = myProfile.chats[theirProfile.dbKey]
            } else {
                existingChat = myProfile.chats[theirProfile.userKey]
            }
            if (existingChat) {
                if (activeChat && activeChat.key === existingChat) {
                    openMessenger()
                } else {
                    setResetMessenger(true);
                    props.onRestartChat(authToken, props.firebaseKey, existingChat);
                    setTimeout(() => {
                        setResetMessenger(false)
                    }, 500)
                }
            } else {
                let myProfile;
                if (myType === 'PAGE' && props.ownedPage) {
                    myProfile = props.ownedPage
                } else if (myType === 'USER' && myPublicProfile) {
                    myProfile = myPublicProfile
                }
                const newChat = createNewChat(myProfile, theirProfile, theirType, myType)
                setLocalActiveChat(newChat)
                props.onClearLocalChatRecord()
                props.onStartNewChat(authToken, myProfile, theirProfile, newChat, theirType, myType)
            }
        } else {
            let myProfile;
            if (myType === 'PAGE' && props.ownedPage) {
                myProfile = props.ownedPage
            } else if (myType === 'USER' && myPublicProfile) {
                myProfile = myPublicProfile
            }

            const newChat = createNewChat(myProfile, theirProfile, theirType, myType)
            setLocalActiveChat(newChat)
            props.onStartNewChat(authToken, myProfile, theirProfile, newChat, theirType, myType)
        }
        openMessenger();
    }

    return (
        <MessengerContext.Provider value={{showMessenger:showMessenger, openMessenger: openMessenger, minimizeMessenger: minimizeMessenger, closeMessenger: closeMessenger, startChat: startChat, retrieveChat: retrieveChat, localActiveChat: localActiveChat, fetchActiveChat: fetchActiveChat, clearActiveChat: clearActiveChat, removeFromNewMessages: removeFromNewMessages, showActiveChat: showActiveChat, resetMessengerStarter: resetMessenger}}>
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
        activeChat: state.profile.activeChat,
        chatRecord: state.messenger.chatRecord
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRestartChat: (authToken, userKey, chatKey) => dispatch(actions.restartOldChatAttempt(authToken, userKey, chatKey)),
        onStartNewChat: (authToken, myProfile, theirProfile, chat, theirType, myType) => dispatch(actions.startNewChatAttempt(authToken, myProfile, theirProfile, chat, theirType, myType)),
        onFetchActiveChat: (authToken, userKey) => dispatch(actions.fetchActiveChatAttempt(authToken, userKey)),
        onFetchChatRecord: (authToken, chatKey) => dispatch(actions.fetchChatRecordAttempt(authToken, chatKey)),
        onClearActiveChat: (authToken, userKey) => dispatch(actions.clearActiveChatAttempt(authToken, userKey)),
        onRemoveFromNewMessages: (authToken, pathRoot, myKey, theirKey) => dispatch(actions.removeFromNewMessagesAttempt(authToken, pathRoot, myKey, theirKey)),
        onClearLocalActiveChat: () => dispatch(actions.clearLocalActiveChat()),
        onClearLocalChatRecord: () => dispatch(actions.clearLocalChatRecord())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(messengerContextProvider);