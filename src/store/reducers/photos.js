
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    byMe: [],
    loadingByMePhotos: false,
    taggedMe: [],
    loadingTaggedMePhotos: false,
    error: null
}

const fetchByMeInit = (state,action) => {
    return {
        ...state,
        loadingByMePhotos: true
    }
}

const fetchByMeSuccess = (state,action) => {
    return {
        ...state,
        byMe: action.photos,
        loadingByMePhotos: false
    }
}

const fetchByMeFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        loadingByMePhotos: false
    }
}


const fetchTaggedMeInit = (state,action) => {
    return {
        ...state,
        loadingTaggedMePhotos: true
    }
}

const fetchTaggedMeSuccess = (state,action) => {
    return {
        ...state,
        taggedMe: action.photos,
        loadingTaggedMePhotos: false
    }
}

const fetchTaggedMeFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        loadingTaggedMePhotos: false
    }
}

const clearPhotos = () => {
    return {
        ...initialState
    }
}


const reducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.FETCH_BY_ME_PHOTOS_INIT: return fetchByMeInit(state,action);
        case actionTypes.FETCH_BY_ME_PHOTOS_SUCCESS: return fetchByMeSuccess(state,action);
        case actionTypes.FETCH_BY_ME_PHOTOS_FAIL: return fetchByMeFail(state,action);
        case actionTypes.FETCH_TAGGED_ME_PHOTOS_INIT: return fetchTaggedMeInit(state,action);
        case actionTypes.FETCH_TAGGED_ME_PHOTOS_SUCCESS: return fetchTaggedMeSuccess(state,action);
        case actionTypes.FETCH_TAGGED_ME_PHOTOS_FAIL: return fetchTaggedMeFail(state,action);
        case actionTypes.CLEAR_PHOTOS: return clearPhotos(state,action);
        default:
            return state;
    }
}

export default reducer;