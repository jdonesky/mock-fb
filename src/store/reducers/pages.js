
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pageInProgress: null,
    myPages: [],
    othersPages: [],
    creatingNewPage: false,
    fetchingMyPages: false,
    fetchingOthersPages: false,
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

const fetchMyPagesInit = (state,action) => {
    return {
        ...state,
        fetchingMyPages: true
    }
}

const fetchMyPagesSuccess = (state,action) => {
    return {
        ...state,
        myPages: action.pages,
        fetchingMyPages: false
    }
}

const fetchMyPagesFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        fetchingMyPages: false
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_PAGE_INIT: return createPageInit(state,action);
        case actionTypes.START_CREATE_PAGE_SUCCESS: return startCreatePageSuccess(state,action);
        case actionTypes.FINISH_CREATE_PAGE_SUCCESS: return finishCreatePageSuccess(state,action);
        case actionTypes.CREATE_PAGE_FAIL: return createPageFail(state,action);
        case actionTypes.FETCH_MY_PAGES_INIT: return fetchMyPagesInit(state,action);
        case actionTypes.FETCH_MY_PAGES_SUCCESS: return fetchMyPagesSuccess(state,action);
        case actionTypes.FETCH_MY_PAGES_FAIL: return fetchMyPagesFail(state,action);
        default:
            return state
    }
}

export default reducer;