
import * as actionTypes from './actionTypes';
import axios from '../../axios/db-axios-instance';

const startNewChatInit = () => {
    return {
        type: actionTypes.START_NEW_CHAT_INIT
    }
}

const startNewChatSuccess = (chat) => {
    return {
        type: actionTypes.START_NEW_CHAT_SUCCESS,
        chat: chat
    }
}

const startNewChatFail = (error) => {
    return {
        type: actionTypes.START_NEW_CHAT_FAIL,
        error: error
    }
}

export const startNewChatAttempt = (authToken, myProfile, theirProfile) => {
    return dispatch => {
        let chatKey;
        let myNewProfile;
        let theirNewProfile;
        const newChat = {
            parties: [myProfile.userKey, theirProfile.userKey],
            messages: []
        }
        dispatch(startNewChatInit())
        axios.post(`/chats.json?auth=${authToken}`, newChat)
            .then(response => {
                chatKey = response.data.name;

                myNewProfile = {...myProfile}
                let myNewChats;
                if (myNewProfile.chats && myNewProfile.chats.length) {
                    myNewChats = [...myNewProfile.chats, {userKey: theirProfile.userKey, chatKey: chatKey}]
                } else {
                    myNewChats = [{userKey: theirProfile.userKey, chatKey: chatKey}]
                }
                myNewProfile.chats = myNewChats;

                theirNewProfile = {...theirProfile}
                let theirNewChats;
                if (theirNewProfile.chats && theirNewProfile.chats.length) {
                    theirNewChats = [...theirNewProfile.chats, {userKey: myProfile.userKey, chatKey:chatKey}]
                } else {
                    theirNewChats = [{userKey: myProfile.userKey, chatKey:chatKey}]
                }
                theirNewProfile.chats = theirNewChats
                return axios.put(`/public-profiles/${theirNewProfile.publicProfileKey}.json?auth=${authToken}`, theirNewProfile)
            })
            .then(response => {
                console.log('SUCCESS - put their new profile with chat');
                return axios.put(`/public-profiles/${myNewProfile.publicProfileKey}.json?auth=${authToken}`, myNewProfile)
            })
            .then(response => {
                console.log('SUCCESS - put my new profile with chat');
                dispatch(startNewChatSuccess(newChat))
            })
            .catch(error => {
                console.log('fail', error);
                dispatch(startNewChatFail(error))
            })
    }
}

const restartOldChatInit = () => {
    return {
        type: actionTypes.RESTART_OLD_CHAT_INIT
    }
}

const restartOldChatSuccess = (chat) => {
    return {
        type: actionTypes.RESTART_OLD_CHAT_SUCCESS,
        chat: chat
    }
}

const restartOldChatFail = (error) => {
    return {
        type: actionTypes.RESTART_OLD_CHAT_FAIL,
        error: error
    }
}

export const restartOldChatAttempt = (authToken, chatKey) => {
    return dispatch => {
        dispatch(restartOldChatInit());
    }
}
