
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    newMessages: null,
    chatRecord: null,
    fetchingChatRecord: false,
    sendingMessage: false,
    error: null,
}

const fetchChatRecordInit = (state,action) => {
    return {
        ...state,
        fetchingChatRecord: true
    }
}

const fetchChatRecordSuccess = (state,action) => {
    return {
        ...state,
        chatRecord: action.chat,
        fetchingChatRecord: false
    }
}

const fetchChatRecordFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        fetchingChatRecord: false
    }
}

const sendMessageInit = (state,action) => {
    return {
        ...state,
        sendingMessage: true
    }
}

const sendMessageSuccess = (state,action) => {
    return {
        ...state,
        // chatRecord: action.chat,
        sendingMessage: false
    }
}

const sendMessageFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        sendingMessage: false
    }
}

const updateNewMessages = (state,action) => {
    return {
        ...state,
        newMessages: action.messages
    }
}

const clearLocalChatRecord = (state,action) => {
    return initialState
}

const reducer = (state= initialState,action) => {
    switch(action.type) {
        case actionTypes.UPDATE_NEW_MESSAGES: return updateNewMessages(state,action);
        case actionTypes.FETCH_CHAT_RECORD_INIT: return fetchChatRecordInit(state,action);
        case actionTypes.FETCH_CHAT_RECORD_SUCCESS: return fetchChatRecordSuccess(state,action);
        case actionTypes.FETCH_CHAT_RECORD_FAIL: return fetchChatRecordFail(state,action);
        case actionTypes.SEND_MESSAGE_INIT: return sendMessageInit(state,action);
        case actionTypes.SEND_MESSAGE_SUCCESS: return sendMessageSuccess(state,action);
        case actionTypes.SEND_MESSAGE_FAIL: return sendMessageFail(state,action);
        case actionTypes.CLEAR_LOCAL_CHAT_RECORD: return clearLocalChatRecord(state,action);

        default: return state;
    }
}

export default reducer;