
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    idInProcess: null,
    newActivity: null,
    oldActivity: null,
    personalActivity: null,
    fetchingNewActivity: false,
    fetchingOldActivity: false,
    fetchingPersonalActivity: false,
    switchingReadStatus: false,
    creatingActivity: false,
    deletedActivity: false,
    error: null
}


const fetchNewActivityInit = (state,action) => {
    return {
        ...state,
        fetchingNewActivity: true
    }
}

const fetchNewActivitySuccess = (state,action) => {
    return {
        ...state,
        newActivity: action.records,
        fetchingNewActivity: false
    }
}

const fetchNewActivityFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        fetchingNewActivity: false
    }
}

const fetchPersonalActivityInit = (state,action) => {
    return {
        ...state,
        fetchingPersonalActivity: true
    }
}

const fetchPersonalActivitySuccess = (state,action) => {
    return {
        ...state,
        personalActivity: action.records,
        fetchingPersonalActivity: false
    }
}

const fetchPersonalActivityFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        fetchingPersonalActivity: false
    }
}

const switchReadStatusInit = (state,action) => {
    return {
        ...state,
        switchingReadStatus: true,
        idInProcess: action.id
    }
}

const switchReadStatusSuccess = (state,action) => {
    return {
        ...state,
        switchingReadStatus: false,
        idInProcess: null
    }
}

const switchReadStatusFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        switchingReadStatus: false,
        idInProcess: null
    }
}

const createActivityInit = (state,action) => {
    return {
        ...state,
        creatingActivity: true
    }
}

const createActivitySuccess = (state,action) => {
    return {
        ...state,
        creatingActivity: false
    }
}

const createActivityFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        creatingActivity: false
    }
}

const deleteActivityInit = (state,action) => {
    return {
        ...state,
        deletedActivity: true,
        idInProcess: action.id
    }
}

const deleteActivitySuccess = (state,action) => {
    return {
        ...state,
    }
}

const deleteActivityFail = (state,action) => {
    return {
        ...state,
        error: action.error,
    }
}

const clearLocalActivity = (state,action) => {
    return {
        ...state,
        [action.loc]: null
    }
}

const logoutClearActivity = (state, action) => {
    return initialState
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_NEW_ACTIVITY_INIT: return fetchNewActivityInit(state,action);
        case actionTypes.FETCH_NEW_ACTIVITY_SUCCESS: return fetchNewActivitySuccess(state,action);
        case actionTypes.FETCH_NEW_ACTIVITY_FAIL: return fetchNewActivityFail(state,action);
        case actionTypes.FETCH_PERSONAL_ACTIVITY_INIT: return fetchPersonalActivityInit(state,action);
        case actionTypes.FETCH_PERSONAL_ACTIVITY_SUCCESS: return fetchPersonalActivitySuccess(state,action);
        case actionTypes.FETCH_PERSONAL_ACTIVITY_FAIL: return fetchPersonalActivityFail(state,action);
        case actionTypes.SWITCH_READ_STATUS_INIT: return switchReadStatusInit(state,action);
        case actionTypes.SWITCH_READ_STATUS_SUCCESS: return switchReadStatusSuccess(state,action);
        case actionTypes.SWITCH_READ_STATUS_FAIL: return switchReadStatusFail(state,action);
        case actionTypes.CREATE_ACTIVITY_INIT: return createActivityInit(state,action);
        case actionTypes.CREATE_ACTIVITY_SUCCESS: return createActivitySuccess(state,action);
        case actionTypes.CREATE_ACTIVITY_FAIL: return createActivityFail(state,action);
        case actionTypes.DELETE_ACTIVITY_INIT: return deleteActivityInit(state,action);
        case actionTypes.DELETE_ACTIVITY_SUCCESS: return deleteActivitySuccess(state,action);
        case actionTypes.DELETE_ACTIVITY_FAIL: return deleteActivityFail(state,action);
        case actionTypes.CLEAR_LOCAL_ACTIVITY: return clearLocalActivity(state,action);
        case actionTypes.LOGOUT_CLEAR_ACTIVITY: return logoutClearActivity(state,action);
        default: return state;
    }
}

export default reducer;