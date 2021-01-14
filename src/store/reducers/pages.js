
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pageInProgress: null,
    ownedPage: null,
    ownedPageKeys: [],
    myPages: [],
    othersPage: null,
    othersPages: [],
    pageSummary: null,
    creatingNewPage: false,
    fetchingOwnedPage: false,
    fetchingOwnedPageKeys: false,
    fetchingOwnedPages: false,
    fetchingOthersPage: false,
    fetchingOthersPages: false,
    fetchingPageSummary: false,
    editingPageAbout: false,
    editingProfileImage: false,
    editingCoverImage: false,
    requestingPageLike: false,
    switchingPageAvailability: false,
    likingPage: false,
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

const fetchOwnedPageKeysInit = (state,action) => {
    return {
        ...state,
        fetchingOwnedPageKeys: true
    }
}

const fetchOwnedPageKeysSuccess = (state,action) => {
    return {
        ...state,
        ownedPageKeys: action.pageKeys,
        fetchingOwnedPageKeys: false
    }
}

const fetchOwnedPageKeysFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        fetchingOwnedPageKeys: false
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

const fetchOthersPageInit = (state,action) => {
    return {
        ...state,
        fetchingOthersPage: true
    }
}

const fetchOthersPageSuccess = (state,action) => {
    return {
        ...state,
        othersPage: action.page,
        fetchingOthersPage: false
    }
}

const fetchOthersPageFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        fetchingOthersPage: false
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

const likePageInit = (state,action) => {
    return {
        ...state,
        likingPage: true
    }
}

const likePageSuccess = (state,action) => {
    return {
        ...state,
        likingPage: false
    }
}

const likePageFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        likingPage: false
    }
}

const switchPageAvailabilityInit = (state,action) => {
    return {
        ...state,
        switchingPageAvailability: true
    }
}

const switchPageAvailabilitySuccess = (state,action) => {
    return {
        ...state,
        switchingPageAvailability: false
    }
}

const switchPageAvailabilityFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        switchingPageAvailability: false
    }
}

const clearPageSummary = (state,action) => {
    return {
        ...state,
        pageSummary: null
    }
}

const clearPageInProgress = (state,action) => {
    return {
        ...state,
        pageInProgress: null,
    }
}

export const logoutClearPages = (state,action) => {
    return initialState
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_PAGE_INIT: return createPageInit(state,action);
        case actionTypes.START_CREATE_PAGE_SUCCESS: return startCreatePageSuccess(state,action);
        case actionTypes.FINISH_CREATE_PAGE_SUCCESS: return finishCreatePageSuccess(state,action);
        case actionTypes.CREATE_PAGE_FAIL: return createPageFail(state,action);
        case actionTypes.FETCH_OWNED_PAGE_KEYS_INIT: return fetchOwnedPageKeysInit(state,action);
        case actionTypes.FETCH_OWNED_PAGE_KEYS_SUCCESS: return fetchOwnedPageKeysSuccess(state,action);
        case actionTypes.FETCH_OWNED_PAGE_KEYS_FAIL: return fetchOwnedPageKeysFail(state,action);
        case actionTypes.FETCH_OWNED_PAGES_INIT: return fetchOwnedPagesInit(state,action);
        case actionTypes.FETCH_OWNED_PAGES_SUCCESS: return fetchOwnedPagesSuccess(state,action);
        case actionTypes.FETCH_OWNED_PAGES_FAIL: return fetchOwnedPagesFail(state,action);
        case actionTypes.FETCH_OWNED_PAGE_INIT: return fetchOwnedPageInit(state,action);
        case actionTypes.FETCH_OWNED_PAGE_SUCCESS: return fetchOwnedPageSuccess(state,action);
        case actionTypes.FETCH_OWNED_PAGE_FAIL: return fetchOwnedPageFail(state,action);
        case actionTypes.FETCH_OTHERS_PAGE_INIT: return fetchOthersPageInit(state,action);
        case actionTypes.FETCH_OTHERS_PAGE_SUCCESS: return fetchOthersPageSuccess(state,action);
        case actionTypes.FETCH_OTHERS_PAGE_FAIL: return fetchOthersPageFail(state,action);
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
        case actionTypes.LIKE_PAGE_INIT: return likePageInit(state,action);
        case actionTypes.LIKE_PAGE_SUCCESS: return likePageSuccess(state,action);
        case actionTypes.LIKE_PAGE_FAIL: return likePageFail(state,action);
        case actionTypes.SWITCH_PAGE_AVAILABILITY_INIT: switchPageAvailabilityInit(state,action);
        case actionTypes.SWITCH_PAGE_AVAILABILITY_SUCCESS: switchPageAvailabilitySuccess(state,action);
        case actionTypes.SWITCH_PAGE_AVAILABILITY_FAIL: switchPageAvailabilityFail(state,action);
        case actionTypes.CLEAR_PAGE_SUMMARY: return clearPageSummary(state,action);
        case actionTypes.CLEAR_PAGE_IN_PROGRESS: return clearPageInProgress(state,action);
        case actionTypes.LOGOUT_CLEAR_PAGES: return logoutClearPages(state,action);
        default:
            return state
    }
}

export default reducer;