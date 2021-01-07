
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    results: null,
    searchingAll: false,
    error: null,
}

const searchAllInit = (state,action) => {
    return {
        ...state,
        searchingAll : true
    }
}

const searchAllSuccess = (state,action) => {
    return {
        ...state,
        results: action.results,
        searchingAll : false
    }
}

const searchAllFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        searchingAll : false
    }
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_ALL_INIT: return searchAllInit(state,action);
        case actionTypes.SEARCH_ALL_SUCCESS: return searchAllSuccess(state,action);
        case actionTypes.SEARCH_ALL_FAIL: return searchAllFail(state,action);
        default: return state;
    }
}

export default reducer;