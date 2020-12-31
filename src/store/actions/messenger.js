
import * as actionTypes from './actionTypes';
import axios from '../../axios/db-axios-instance';
import {KeyGenerator} from "../../shared/utility";

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
            parties: [
                    {name: myProfile.firstName + ' ' + myProfile.lastName, profileImage: myProfile.profileImage, userKey:myProfile.userKey},
                    {name: theirProfile.firstName + ' ' + theirProfile.lastName, profileImage: theirProfile.profileImage, userKey: theirProfile.userKey}
                ],
            messages: [],
            startDate: new Date()
        }
        console.log('new Chat ', newChat)
        dispatch(startNewChatInit())
        axios.post(`/chats.json?auth=${authToken}`, newChat)
            .then(response => {
                console.log('SUCCESS - posted new chat')
                chatKey = response.data.name;
                return axios.put(`/chats/${chatKey}.json?auth=${authToken}`, {...newChat, key: chatKey})
                    .then(response => {
                        myNewProfile = {...myProfile}
                        let myNewChats;
                        if (myNewProfile.chats) {
                            myNewChats = {...myNewProfile.chats, [theirProfile.userKey]: chatKey}
                        } else {
                            myNewChats = {[theirProfile.userKey] : chatKey}
                        }
                        myNewProfile.chats = myNewChats;

                        theirNewProfile = {...theirProfile}
                        let theirNewChats;
                        if (theirNewProfile.chats) {
                            theirNewChats = {...theirNewProfile.chats, [myProfile.userKey]: chatKey}
                        } else {
                            theirNewChats = {[myProfile.userKey]: chatKey}
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
                        return axios.put(`/activeChat.json?auth=${authToken}`, {...newChat, key: chatKey})
                    })
                    .then(response => {
                        console.log('SUCCESS - post active chat');
                        dispatch(startNewChatSuccess(newChat))
                    })
                    .catch(error => {
                        console.log('fail', error);
                        dispatch(startNewChatFail(error))
                    })
            })
            .catch(error => {
                console.log('fail - post chat ');
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
        axios.get(`/chats/${chatKey}.json?auth=${authToken}`)
            .then(response => {
                console.log('SUCCESS - got previous chat', response.data);
                console.log('fetch without messages field? ')
                return axios.put(`/activeChat.json?auth=${authToken}`, response.data)
            })
            .then(response => {
                console.log('SUCCESS - post active chat', response.data);
                dispatch(restartOldChatSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(restartOldChatFail(error));
            })
    }
}

const sendMessageInit = () => {
    return {
        type: actionTypes.SEND_MESSAGE_INIT
    }
}

const sendMessageSuccess = (chat) => {
    return {
        type: actionTypes.SEND_MESSAGE_SUCCESS,
        chat: chat
    }
}

const sendMessageFail = (error) => {
    return {
        type: actionTypes.SEND_MESSAGE_FAIL,
        error: error
    }
}

export const sendMessageAttempt = (authToken, chatKey, message) => {
    return dispatch => {
        let newChat;
        dispatch(sendMessageInit());
        KeyGenerator.getKey(authToken, (newKey) => {
            const newMessage = {...message, id: newKey}
            axios.get(`/chats/${chatKey}/messages.json?auth=${authToken}`)
                .then(response => {
                    if (response.data && response.data.length) {
                        newChat = [...response.data, newMessage]
                    } else {
                        newChat = [newMessage]
                    }
                    return axios.put(`/chats/${chatKey}/messages.json?auth=${authToken}`, newChat)
                })
                .then(response => {
                    dispatch(sendMessageSuccess(newChat))
                })
                .catch(error => {
                    dispatch(sendMessageFail(error));
                })
        })
    }
}


const fetchActiveChatInit = () => {
    return {
        type: actionTypes.FETCH_ACTIVE_CHAT_INIT
    }
}

const fetchActiveChatSuccess = (chat) => {
    return {
        type: actionTypes.FETCH_ACTIVE_CHAT_SUCCESS,
        chat: chat
    }
}

const fetchActiveChatFail = (error) => {
    return {
        type: actionTypes.FETCH_ACTIVE_CHAT_FAIL,
        error: error
    }
}

export const fetchActiveChatAttempt = (authToken) => {
    return dispatch => {
        dispatch(fetchActiveChatInit())
        axios.get(`/activeChat.json?auth=${authToken}`)
            .then(response => {
                console.log('SUCCESS - get active chat')
                dispatch(fetchActiveChatSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchActiveChatFail(error));
            })
    }
}

const clearActiveChatInit = () => {
    return {
        type: actionTypes.CLEAR_ACTIVE_CHAT_INIT
    }
}

const clearActiveChatSuccess = () => {
    return {
        type: actionTypes.CLEAR_ACTIVE_CHAT_SUCCESS,
    }
}

const clearActiveChatFail = (error) => {
    return {
        type: actionTypes.CLEAR_ACTIVE_CHAT_FAIL,
        error: error
    }
}

export const clearActiveChatAttempt = (authToken) => {
    return dispatch => {
        dispatch(clearActiveChatInit())
        axios.delete(`/activeChat.json?auth=${authToken}`)
            .then(response => {
                console.log('SUCCESS - deleted active chat')
                dispatch(clearActiveChatSuccess())
            })
            .catch(error => {
                console.log('FAIL - ')
                dispatch(clearActiveChatFail(error))
            })
    }
}

const fetchChatRecordInit = () => {
    return {
        type: actionTypes.FETCH_CHAT_RECORD_INIT
    }
}

const fetchChatRecordSuccess = (chat) => {
    return {
        type: actionTypes.FETCH_CHAT_RECORD_SUCCESS,
        chat: chat
    }
}

const fetchChatRecordFail = (error) => {
    return {
        type: actionTypes.FETCH_CHAT_RECORD_FAIL,
        error: error
    }
}

export const fetchChatRecordAttempt = (authToken, chatKey) => {
    return dispatch => {
        console.log('fetching chatRecord')
        dispatch(fetchChatRecordInit())
        axios.get(`/chats/${chatKey}.json?auth=${authToken}`)
            .then(response => {
                console.log('success - fetched chatRecord')
                dispatch(fetchChatRecordSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchChatRecordFail(error))
            })
    }
}