
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

// export const sendMessageAttempt = (authToken, chatKey, message) => {
//     console.log('SENDING MESSAGE ATTEMPT')
//     return dispatch => {
//         let newChat;
//         dispatch(sendMessageInit());
//         KeyGenerator.getKey(authToken, (newKey) => {
//             const newMessage = {...message, id: newKey}
//             console.log('newMessage', newMessage)
//             axios.get(`/chats/${chatKey}/messages.json?auth=${authToken}`)
//                 .then(response => {
//                     if (response.data && response.data.length) {
//                         newChat = [...response.data, newMessage]
//                     } else {
//                         newChat = [newMessage]
//                     }
//                     return axios.put(`/chats/${chatKey}/messages.json?auth=${authToken}`, newChat)
//                 })
//                 .then(response => {
//                     console.log('put message', response);
//                     dispatch(sendMessageSuccess(newChat))
//                 })
//                 .catch(error => {
//                     dispatch(sendMessageFail(error));
//                 })
//         })
//     }
// }



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