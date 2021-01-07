import * as actionTypes from "../actions/actionTypes";

const initialState = {
  singleProfile: null,
  loadingSingleProfile: false,
  profileSummary: null,
  loadingProfileSummary: false,
  manyProfiles: [],
  loadingManyProfiles: false,
  fullProfile: null,
  loadingFullProfile: false,
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

const fetchProfileSummaryInit = (state, action) => {
  return {
    ...state,
    loadingProfileSummary: true,
  };
};

const fetchProfileSummarySuccess = (state, action) => {
  return {
    ...state,
    profileSummary: action.profile,
    loadingProfileSummary: false
  }
};

const fetchProfileSummaryFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loadingProfileSummary: false,
  };
};

const fetchManyPublicProfilesInit = (state,action) => {
  return {
    ...state,
    loadingManyProfiles: true
  }
}

const fetchManyPublicProfilesSuccess = (state,action) => {
  return {
    ...state,
    manyProfiles: action.profiles,
    loadingManyProfiles: false
  }
}

const fetchManyPublicProfilesFail = (state, action) => {
  return {
    ...state,
    error: action.error
  }
}

const fetchFullProfileInit = (state, action) => {
  return {
    ...state,
    loadingFullProfile: true
  }
}

const fetchFullProfileSuccess = (state,action) => {
  return {
    ...state,
    fullProfile: action.profile,
    loadingFullProfile: false,
  }
}

const fetchFullProfileFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    loadingFullProfile: false
  }
}

const clearProfileSummary = (state,action) => {
  return {
    ...state,
    profileSummary: null
  }
}

const clearPublicProfile = (state,action) => {
  return {
    ...state,
    singleProfile: null,
  }
}

const clearManyProfiles = (state,action) => {
    return {
      ...state,
      manyProfiles: []
    }
}

const clearUsers = (state,action) => {
  return {
    ...initialState
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PUBLIC_PROFILE_INIT: return fetchPublicProfileInit(state, action);
    case actionTypes.FETCH_PUBLIC_PROFILE_SUCCESS: return fetchPublicProfileSuccess(state, action);
    case actionTypes.FETCH_PUBLIC_PROFILE_FAIL: return fetchPublicProfileFail(state, action);
    case actionTypes.FETCH_PROFILE_SUMMARY_INIT: return fetchProfileSummaryInit(state, action);
    case actionTypes.FETCH_PROFILE_SUMMARY_SUCCESS: return fetchProfileSummarySuccess(state, action);
    case actionTypes.FETCH_PROFILE_SUMMARY_FAIL: return fetchProfileSummaryFail(state, action);
    case actionTypes.FETCH_MANY_PUBLIC_PROFILES_INIT: return fetchManyPublicProfilesInit(state, action);
    case actionTypes.FETCH_MANY_PUBLIC_PROFILES_SUCCESS: return fetchManyPublicProfilesSuccess(state, action);
    case actionTypes.FETCH_MANY_PUBLIC_PROFILES_FAIL: return fetchManyPublicProfilesFail(state, action);
    case actionTypes.FETCH_FULL_PROFILE_INIT: return fetchFullProfileInit(state, action);
    case actionTypes.FETCH_FULL_PROFILE_SUCCESS: return fetchFullProfileSuccess(state, action);
    case actionTypes.FETCH_FULL_PROFILE_FAIL: return fetchFullProfileFail(state, action);
    case actionTypes.CLEAR_PROFILE_SUMMARY: return clearProfileSummary(state,action);
    case actionTypes.CLEAR_PUBLIC_PROFILE: return clearPublicProfile(state,action);
    case actionTypes.CLEAR_MANY_PROFILES: return clearManyProfiles(state,action);
    case actionTypes.CLEAR_USERS: return clearUsers(state,action);
    default:
      return state;
  }
};

export default reducer;
