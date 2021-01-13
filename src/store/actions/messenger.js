
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
    console.log('SENDING MESSAGE ATTEMPT')
    return dispatch => {
        dispatch(sendMessageInit());
        axios.post(`/chats/${chatKey}/messages.json?auth=${authToken}`, message)
            .then(response => {
                console.log('posted message', response.data.name);
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
        axios.get(`public-profiles/${publicProfileKey}/chats.json?auth=${authToken}`)
            .then(response => {
                let chats = response.data;
                if (chats && Object.keys(chats).length) {
                    chats = Object.keys(chats).map(key => ({key: key, otherPartyKey: key, chatKey: chats[key]}))
                    dispatch(fetchMyChatsSuccess(chats))
                }
            })
            .catch(error => {
                console.log('failed fetching chats -> ', error);
                dispatch(fetchMyChatsFail(error))
            })

    }
}

export const clearLocalChatRecord = () => {
    return {
        type: actionTypes.CLEAR_LOCAL_CHAT_RECORD
    }
}

export const updateNewMessages = (messages) => {
    return {
        type: actionTypes.UPDATE_NEW_MESSAGES,
        messages: messages
    }
}


