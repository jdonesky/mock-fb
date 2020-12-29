
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activeChat: null,
    startingChat: false,
    restartingChat: false,
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

const reducer = (state=initialState,action) => {
    switch(action.type) {
        case actionTypes.START_NEW_CHAT_INIT: return startNewChatInit(state,action);
        case actionTypes.START_NEW_CHAT_SUCCESS: return startNewChatSuccess(state,action);
        case actionTypes.START_NEW_CHAT_FAIL: return startNewChatFail(state,action);
        case actionTypes.RESTART_OLD_CHAT_INIT: return restartOldChatInit(state,action);
        case actionTypes.RESTART_OLD_CHAT_SUCCESS: return restartOldChatSuccess(state,action);
        case actionTypes.RESTART_OLD_CHAT_FAIL: return restartOldChatFail(state,action);
        default: return state;
    }
}

export default reducer;