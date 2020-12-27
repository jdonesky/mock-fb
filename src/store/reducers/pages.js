
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pageInProgress: null,
    ownedPage: null,
    myPages: [],
    otherPage: null,
    othersPages: [],
    pageSummary: null,
    creatingNewPage: false,
    fetchingOwnedPages: false,
    fetchingOwnedPage: false,
    fetchingOthersPages: false,
    fetchingOthersPage: false,
    fetchingPageSummary: false,
    editingPageAbout: false,
    editingProfileImage: false,
    editingCoverImage: false,
    requestingPageLike: false,
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

const fetchPageSummaryInit = (state,action) => {
    return {
        ...state,
        fetchingPageSummary: true
    }
}

const fetchPageSummarySuccess = (state,action) => {
    return {
        ...state,
        pageSummary: action.page,
        fetchingPageSummary: false
    }
}

const fetchPageSummaryFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        fetchingPageSummary: false
    }
}

const editPageAboutInit = (state,action) => {
    return {
        ...state,
        editingPageAbout: true
    }
}


const editPageAboutSuccess = (state,action) => {
    return {
        ...state,
        ownedPage: action.page,
        editingPageAbout: false
    }
}

const editPageAboutFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        editingPageAbout: false
    }
}

const editProfileImageInit = (state,action) => {
    return {
        ...state,
        editingProfileImage: true
    }
}

const editProfileImageSuccess = (state,action) => {
    return {
        ...state,
        ownedPage: action.page,
        editingProfileImage: false
    }
}

const editProfileImageFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        editingProfileImage: false
    }
}

const editCoverImageInit = (state,action) => {
    return {
        ...state,
        editingCoverImage: true
    }
}

const editCoverImageSuccess = (state,action) => {
    return {
        ...state,
        ownedPage: action.page,
        editingCoverImage: false
    }
}

const editCoverImageFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        editingCoverImage: false
    }
}

const requestPageLikeInit = (state,action) => {
    return {
        ...state,
        requestingPageLike: true
    }
}

const requestPageLikeSuccess = (state,action) => {
    return {
        ...state,
        ownedPage: action.page,
        requestingPageLike: false
    }
}

const requestPageLikeFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        requestingPageLike: false
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
        case actionTypes.FETCH_PAGE_SUMMARY_INIT: return fetchPageSummaryInit(state,action);
        case actionTypes.FETCH_PAGE_SUMMARY_SUCCESS: return fetchPageSummarySuccess(state,action);
        case actionTypes.FETCH_PAGE_SUMMARY_FAIL: return fetchPageSummaryFail(state,action);
        case actionTypes.EDIT_PAGE_ABOUT_INIT: return editPageAboutInit(state,action);
        case actionTypes.EDIT_PAGE_ABOUT_SUCCESS: return editPageAboutSuccess(state,action);
        case actionTypes.EDIT_PAGE_ABOUT_FAIL: return editPageAboutFail(state,action);
        case actionTypes.EDIT_PAGE_PROFILE_PIC_INIT: return editProfileImageInit(state,action);
        case actionTypes.EDIT_PAGE_PROFILE_PIC_SUCCESS: return editProfileImageSuccess(state,action);
        case actionTypes.EDIT_PAGE_PROFILE_PIC_FAIL: return editProfileImageFail(state,action);
        case actionTypes.EDIT_PAGE_COVER_INIT: return editCoverImageInit(state,action);
        case actionTypes.EDIT_PAGE_COVER_SUCCESS: return editCoverImageSuccess(state,action);
        case actionTypes.EDIT_PAGE_COVER_FAIL: return editCoverImageFail(state,action);
        case actionTypes.REQUEST_PAGE_LIKE_INIT: return requestPageLikeInit(state,action);
        case actionTypes.REQUEST_PAGE_LIKE_SUCCESS: return requestPageLikeSuccess(state,action);
        case actionTypes.REQUEST_PAGE_LIKE_FAIL: return requestPageLikeFail(state,action);
        case actionTypes.CLEAR_PAGE_IN_PROGRESS: return clearPageInProgress(state,action);
        default:
            return state
    }
}

export default reducer;