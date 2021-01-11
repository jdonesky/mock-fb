
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
    retrieveChat: () => {},
})

const messengerContextProvider = props => {

    const [localActiveChat, setLocalActiveChat] = useState(null);
    const [showMessenger, setShowMessenger] = useState(false);
    const [showActiveChat, setShowActiveChat] = useState(true);
    const {authToken, myPublicProfile, ownedPage, onFetchActiveChat, activeChat} = props


    useEffect(() => {
        if (authToken && props.firebaseKey) {
            onFetchActiveChat(authToken, props.firebaseKey);
        }
    }, [])

    useEffect(() => {
        if (activeChat) {
            setLocalActiveChat(activeChat)
        }
    }, [activeChat])

    const fetchActiveChat = () => {
        if (authToken && props.firebaseKey) {
            console.log('NOW ... fetching')
            onFetchActiveChat(authToken, props.firebaseKey);
        }
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
                console.log('existingChat - restartChat', existingChat)
                props.onRestartChat(authToken, props.firebaseKey, existingChat, (fetchedChat) => {
                    setLocalActiveChat(fetchedChat)
                });
            }
        } else {
            console.log('no existingChat creating new chat')
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
        openMessenger(); //!!!
    }

    const retrieveChat = (chatKey) => {
        console.log('RETRIEVING CHAT', chatKey);
        props.onRestartChat(authToken, props.firebaseKey, chatKey)
        openMessenger();
    }

    const clearActiveChat = () => {
        console.log('CLICKED');
        setShowMessenger(false);
        setLocalActiveChat(null);
        props.onClearActiveChat(props.authToken, props.firebaseKey)
    }

    return (
        <MessengerContext.Provider value={{showMessenger:showMessenger, openMessenger: openMessenger, minimizeMessenger: minimizeMessenger, closeMessenger: closeMessenger, startChat: startChat, retrieveChat: retrieveChat, localActiveChat: localActiveChat, fetchActiveChat: fetchActiveChat, clearActiveChat: clearActiveChat, showActiveChat: showActiveChat}}>
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
        onStartNewChat: (authToken, myProfile, theirProfile, chat, theirType, myType) => dispatch(actions.startNewChatAttempt(authToken, myProfile, theirProfile, chat, theirType, myType)),
        onSendMessage: (authToken, chatKey, message) => dispatch(actions.sendMessageAttempt(authToken, chatKey, message)),
        onFetchActiveChat: (authToken, userKey) => dispatch(actions.fetchActiveChatAttempt(authToken, userKey)),
        onClearActiveChat: (authToken, userKey) => dispatch(actions.clearActiveChatAttempt(authToken, userKey)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(messengerContextProvider);