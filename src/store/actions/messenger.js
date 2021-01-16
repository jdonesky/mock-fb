
import * as actionTypes from './actionTypes';
import axios from '../../axios/db-axios-instance';

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
        dispatch(sendMessageInit());
        axios.post(`/chats/${chatKey}/messages.json?auth=${authToken}`, message)
            .then(response => {
                dispatch(sendMessageSuccess())
            })
            .catch(error => {
                dispatch(sendMessageFail(error));
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
        dispatch(fetchChatRecordInit())
        axios.get(`/chats/${chatKey}.json?auth=${authToken}`)
            .then(response => {
                dispatch(fetchChatRecordSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchChatRecordFail(error))
            })
    }
}

const fetchMyChatsInit = () => {
    return {
        type: actionTypes.FETCH_MY_CHATS_INIT
    }
}

const fetchMyChatsSuccess = (chats) => {
    return {
        type: actionTypes.FETCH_MY_CHATS_SUCCESS,
        chats: chats
    }
}

const fetchMyChatsFail = () => {
    return {
        type: actionTypes.FETCH_MY_CHATS_FAIL
    }
}

export const fetchMyChatsAttempt = (authToken, publicProfileKey) => {
    return dispatch => {
        dispatch(fetchMyChatsInit())
        let chatKeys;
        axios.get(`public-profiles/${publicProfileKey}/chats.json?auth=${authToken}`)
            .then(response => {
                chatKeys = Object.keys(response.data).map(key => response.data[key]);
                let chatQueries;
                if (response.data && Object.keys(response.data).length) {
                    chatQueries = chatKeys.map(key => axios.get(`chats/${key}.json?auth=${authToken}`))
                }
                if (chatQueries && chatQueries.length) {
                    return Promise.all(chatQueries)
                }
            })
            .then(responses => {
                const chats = responses.map((response, i) => ({...response.data, chatKey: chatKeys[i] }));
                dispatch(fetchMyChatsSuccess(chats))
            })
            .catch(error => {
                dispatch(fetchMyChatsFail(error))
            })

    }
}


export const updateNewMessages = (messages) => {
    return {
        type: actionTypes.UPDATE_NEW_MESSAGES,
        messages: messages
    }
}


export const clearLocalChatRecord = () => {
    return {
        type: actionTypes.CLEAR_LOCAL_CHAT_RECORD
    }
}

export const logoutClearMessenger = () => {
    return {
        type: actionTypes.LOGOUT_CLEAR_MESSENGER
    }
}