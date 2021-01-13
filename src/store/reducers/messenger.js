
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    newMessages: null,
    myChats: null,
    chatRecord: null,
    fetchingMyChats: false,
    fetchingChatRecord: false,
    sendingMessage: false,
    error: null,
}

const fetchMyChatsInit = (state,action) => {
    return {
        ...state,
        fetchingMyChats: true
    }
}

const fetchMyChatsSuccess = (state,action) => {
    return {
        ...state,
        myChats: action.chats,
        fetchingMyChats: true
    }
}

const fetchMyChatsFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        fetchingMyChats: true
    }
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
        case actionTypes.FETCH_MY_CHATS_INIT: return fetchMyChatsInit(state,action);
        case actionTypes.FETCH_MY_CHATS_SUCCESS: return fetchMyChatsSuccess(state,action);
        case actionTypes.FETCH_MY_CHATS_FAIL: return fetchMyChatsFail(state,action);
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