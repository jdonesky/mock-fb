
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activeChat: null,
    chatRecord: null,
    startingChat: false,
    restartingChat: false,
    fetchingActiveChat: false,
    clearingActiveChat: false,
    fetchingChatRecord: false,
    error: null,
    noActiveChat: false,
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

const fetchActiveChatInit = (state,action) => {
    return {
        ...state,
        fetchingActiveChat: true,
        noActiveChat: false
    }
}

const fetchActiveChatSuccess = (state,action) => {
    return {
        ...state,
        activeChat: action.chat,
        fetchingActiveChat: false
    }
}

const fetchActiveChatFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        fetchingActiveChat: false,
        noActiveChat: true
    }
}

const clearActiveChatInit = (state,action) => {
    return {
        ...state,
        clearingActiveChat: true,
        noActiveChat: false
    }
}

const clearActiveChatSuccess = (state,action) => {
    return {
        ...state,
        activeChat: action.chat,
        clearingActiveSuccess: false,
        noActiveChat: true
    }
}

const clearActiveChatFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        clearingActiveSuccess: false,
        noActiveChat: true
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



const reducer = (state= initialState,action) => {
    switch(action.type) {
        case actionTypes.START_NEW_CHAT_INIT: return startNewChatInit(state,action);
        case actionTypes.START_NEW_CHAT_SUCCESS: return startNewChatSuccess(state,action);
        case actionTypes.START_NEW_CHAT_FAIL: return startNewChatFail(state,action);
        case actionTypes.RESTART_OLD_CHAT_INIT: return restartOldChatInit(state,action);
        case actionTypes.RESTART_OLD_CHAT_SUCCESS: return restartOldChatSuccess(state,action);
        case actionTypes.RESTART_OLD_CHAT_FAIL: return restartOldChatFail(state,action);
        case actionTypes.FETCH_ACTIVE_CHAT_INIT: return fetchActiveChatInit(state,action);
        case actionTypes.FETCH_ACTIVE_CHAT_SUCCESS: return fetchActiveChatSuccess(state,action);
        case actionTypes.FETCH_ACTIVE_CHAT_FAIL: return fetchActiveChatFail(state,action);
        case actionTypes.CLEAR_ACTIVE_CHAT_INIT: return clearActiveChatInit(state,action);
        case actionTypes.CLEAR_ACTIVE_CHAT_SUCCESS: return clearActiveChatSuccess(state,action);
        case actionTypes.CLEAR_ACTIVE_CHAT_FAIL: return clearActiveChatFail(state,action);
        case actionTypes.FETCH_CHAT_RECORD_INIT: return fetchChatRecordInit(state,action);
        case actionTypes.FETCH_CHAT_RECORD_SUCCESS: return fetchChatRecordSuccess(state,action);
        case actionTypes.FETCH_CHAT_RECORD_FAIL: return fetchChatRecordFail(state,action);
        default: return state;
    }
}

export default reducer;