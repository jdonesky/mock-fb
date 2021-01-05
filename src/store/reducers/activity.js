
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    newActivity: null,
    oldActivity: null,
    fetchingNewActivity: false,
    fetchingOldActivity: false,
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


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_NEW_ACTIVITY_INIT: return fetchNewActivityInit(state,action);
        case actionTypes.FETCH_NEW_ACTIVITY_SUCCESS: return fetchNewActivitySuccess(state,action);
        case actionTypes.FETCH_NEW_ACTIVITY_FAIL: return fetchNewActivityFail(state,action);
        default: return state;
    }
}

export default reducer;