
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    chatRecord: null,
    startingChat: false,
    restartingChat: false,
    fetchingActiveChat: false,
    clearingActiveChat: false,
    fetchingChatRecord: false,
    sendingMessage: false,
    error: null,
}

const startNewChatInit = (state,action) => {
    return {
        ...state,
        startingChat: true
    }
}

const startNewChatSuccess = (state,action) => {
    return {
        ...state,
        activeChat: action.chat,
        startingChat: false
    }
}

const startNewChatFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        startingChat: false
    }
}

const restartOldChatInit = (state,action) => {
    return {
        ...state,
        restartingChat: true
    }
}

const restartOldChatSuccess = (state,action) => {
    return {
        ...state,
        activeChat: action.chat,
        restartingChat: false
    }
}

const restartOldChatFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        restartingChat: false
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

const reducer = (state= initialState,action) => {
    switch(action.type) {
        case actionTypes.START_NEW_CHAT_INIT: return startNewChatInit(state,action);
        case actionTypes.START_NEW_CHAT_SUCCESS: return startNewChatSuccess(state,action);
        case actionTypes.START_NEW_CHAT_FAIL: return startNewChatFail(state,action);
        case actionTypes.RESTART_OLD_CHAT_INIT: return restartOldChatInit(state,action);
        case actionTypes.RESTART_OLD_CHAT_SUCCESS: return restartOldChatSuccess(state,action);
        case actionTypes.RESTART_OLD_CHAT_FAIL: return restartOldChatFail(state,action);
        case actionTypes.FETCH_CHAT_RECORD_INIT: return fetchChatRecordInit(state,action);
        case actionTypes.FETCH_CHAT_RECORD_SUCCESS: return fetchChatRecordSuccess(state,action);
        case actionTypes.FETCH_CHAT_RECORD_FAIL: return fetchChatRecordFail(state,action);
        case actionTypes.SEND_MESSAGE_INIT: return sendMessageInit(state,action);
        case actionTypes.SEND_MESSAGE_SUCCESS: return sendMessageSuccess(state,action);
        case actionTypes.SEND_MESSAGE_FAIL: return sendMessageFail(state,action);

        default: return state;
    }
}

export default reducer;