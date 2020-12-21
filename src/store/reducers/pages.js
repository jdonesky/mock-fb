
import * as actionTypes from '../actions/actionTypes';


const initialState = {
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

const createPageSuccess = (state,action) => {
    return {
        ...state,
        myPosts: action.posts,
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
        case actionTypes.CREATE_PAGE_SUCCESS: return createPageSuccess(state,action);
        case actionTypes.CREATE_PAGE_FAIL: return createPageFail(state,action);
        default:
            return state
    }
}