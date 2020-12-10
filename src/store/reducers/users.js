import * as actionTypes from "../actions/actionTypes";

const initialState = {
  singleProfile: null,
  loadingSingleProfile: false,
  manyProfiles: [],
  loadingManyProfiles: false,
  error: null,
};

const fetchPublicProfileInit = (state, action) => {
  return {
    ...state,
    loadingSingleProfile: true,
  };
};

const fetchPublicProfileSuccess = (state, action) => {
  return {
    ...state,
    singleProfile: action.profile,
    loadingSingleProfile: false
  }
};

const fetchPublicProfileFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loadingSingleProfile: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PUBLIC_PROFILE_INIT: return fetchPublicProfileInit(state, action);
    case actionTypes.FETCH_PUBLIC_PROFILE_SUCCESS: return fetchPublicProfileSuccess(state, action);
    case actionTypes.FETCH_PUBLIC_PROFILE_FAIL: return fetchPublicProfileFail(state, action);
    default:
      return state;
  }
};

export default reducer;
