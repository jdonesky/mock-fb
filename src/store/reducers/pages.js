
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pageInProgress: null,
    myPages: [],
    othersPages: [],
    creatingNewPage: false,
    loadingMyPages: false,
    loadingOthersPages: false,
    error: null
}

const createPageInit = (state,action) => {
    return {
        ...state,
        creatingNewPage: true
    }
}

const startCreatePageSuccess = (state,action) => {
    return {
        ...state,
        pageInProgress: action.page,
        creatingNewPage: false
    }
}

const finishCreatePageSuccess = (state,action) => {
    return {
        ...state,
        pageInProgress: null,
        creatingNewPage: false
    }
}

const createPageFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        creatingNewPage: false
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_PAGE_INIT: return createPageInit(state,action);
        case actionTypes.START_CREATE_PAGE_SUCCESS: return startCreatePageSuccess(state,action);
        case actionTypes.FINISH_CREATE_PAGE_SUCCESS: return finishCreatePageSuccess(state,action);
        case actionTypes.CREATE_PAGE_FAIL: return createPageFail(state,action);
        default:
            return state
    }
}

export default reducer;