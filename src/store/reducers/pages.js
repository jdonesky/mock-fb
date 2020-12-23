
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pageInProgress: null,
    ownedPage: null,
    myPages: [],
    otherPage: null,
    othersPages: [],
    creatingNewPage: false,
    fetchingOwnedPages: false,
    fetchingOwnedPage: false,
    fetchingOthersPages: false,
    fetchingOthersPage: false,
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

const fetchOwnedPagesInit = (state,action) => {
    return {
        ...state,
        fetchingOwnedPages: true
    }
}

const fetchOwnedPagesSuccess = (state,action) => {
    return {
        ...state,
        myPages: action.pages,
        fetchingOwnedPages: false
    }
}

const fetchOwnedPagesFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        fetchingOwnedPages: false
    }
}

const fetchOwnedPageInit = (state,action) => {
    return {
        ...state,
        fetchingOwnedPage: true
    }
}

const fetchOwnedPageSuccess = (state,action) => {
    return {
        ...state,
        ownedPage: action.page,
        fetchingOwnedPage: false
    }
}

const fetchOwnedPageFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        fetchingOwnedPage: false
    }
}


const clearPageInProgress = (state,action) => {
    return {
        ...state,
        pageInProgress: null,
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_PAGE_INIT: return createPageInit(state,action);
        case actionTypes.START_CREATE_PAGE_SUCCESS: return startCreatePageSuccess(state,action);
        case actionTypes.FINISH_CREATE_PAGE_SUCCESS: return finishCreatePageSuccess(state,action);
        case actionTypes.CREATE_PAGE_FAIL: return createPageFail(state,action);
        case actionTypes.FETCH_OWNED_PAGES_INIT: return fetchOwnedPagesInit(state,action);
        case actionTypes.FETCH_OWNED_PAGES_SUCCESS: return fetchOwnedPagesSuccess(state,action);
        case actionTypes.FETCH_OWNED_PAGES_FAIL: return fetchOwnedPagesFail(state,action);
        case actionTypes.FETCH_OWNED_PAGE_INIT: return fetchOwnedPageInit(state,action);
        case actionTypes.FETCH_OWNED_PAGE_SUCCESS: return fetchOwnedPageSuccess(state,action);
        case actionTypes.FETCH_OWNED_PAGE_FAIL: return fetchOwnedPageFail(state,action);
        case actionTypes.CLEAR_PAGE_IN_PROGRESS: return clearPageInProgress(state,action);
        default:
            return state
    }
}

export default reducer;