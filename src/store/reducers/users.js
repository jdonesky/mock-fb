import * as actionTypes from "../actions/actionTypes";

const initialState = {
  contactProfile: null,
  singleProfile: null,
  loadingContactProfile: false,
  loadingSingleProfile: false,
  profileSummary: null,
  loadingProfileSummary: false,
  manyProfiles: [],
  manyProfileRequests: [],
  loadingManyProfiles: false,
  loadingManyProfileRequests: false,
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

const fetchContactProfileInit = (state, action) => {
  return {
    ...state,
    loadingContactProfile: true,
  };
};

const fetchContactProfileSuccess = (state, action) => {
  return {
    ...state,
    contactProfile: action.profile,
    loadingContactProfile: false
  }
};

const fetchContactProfileFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loadingContactProfile: false,
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

const fetchManyPublicProfileRequestsInit = (state,action) => {
  return {
    ...state,
    loadingManyProfileRequests: true
  }
}

const fetchManyPublicProfileRequestsSuccess = (state,action) => {
  return {
    ...state,
    manyProfileRequests: action.profiles,
    loadingManyProfileRequests: false
  }
}

const fetchManyPublicProfileRequestsFail = (state, action) => {
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

const logoutClearUsers = (state,action) => {
  return {
    ...initialState
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PUBLIC_PROFILE_INIT: return fetchPublicProfileInit(state, action);
    case actionTypes.FETCH_PUBLIC_PROFILE_SUCCESS: return fetchPublicProfileSuccess(state, action);
    case actionTypes.FETCH_PUBLIC_PROFILE_FAIL: return fetchPublicProfileFail(state, action);
    case actionTypes.FETCH_CONTACT_PROFILE_INIT: return fetchContactProfileInit(state, action);
    case actionTypes.FETCH_CONTACT_PROFILE_SUCCESS: return fetchContactProfileSuccess(state, action);
    case actionTypes.FETCH_CONTACT_PROFILE_FAIL: return fetchContactProfileFail(state, action);
    case actionTypes.FETCH_PROFILE_SUMMARY_INIT: return fetchProfileSummaryInit(state, action);
    case actionTypes.FETCH_PROFILE_SUMMARY_SUCCESS: return fetchProfileSummarySuccess(state, action);
    case actionTypes.FETCH_PROFILE_SUMMARY_FAIL: return fetchProfileSummaryFail(state, action);
    case actionTypes.FETCH_MANY_PUBLIC_PROFILES_INIT: return fetchManyPublicProfilesInit(state, action);
    case actionTypes.FETCH_MANY_PUBLIC_PROFILES_SUCCESS: return fetchManyPublicProfilesSuccess(state, action);
    case actionTypes.FETCH_MANY_PUBLIC_PROFILE_REQUESTS_FAIL: return fetchManyPublicProfileRequestsFail(state, action);
    case actionTypes.FETCH_MANY_PUBLIC_PROFILE_REQUESTS_INIT: return fetchManyPublicProfileRequestsInit(state, action);
    case actionTypes.FETCH_MANY_PUBLIC_PROFILE_REQUESTS_SUCCESS: return fetchManyPublicProfileRequestsSuccess(state, action);
    case actionTypes.FETCH_MANY_PUBLIC_PROFILES_FAIL: return fetchManyPublicProfilesFail(state, action);
    case actionTypes.FETCH_FULL_PROFILE_INIT: return fetchFullProfileInit(state, action);
    case actionTypes.FETCH_FULL_PROFILE_SUCCESS: return fetchFullProfileSuccess(state, action);
    case actionTypes.FETCH_FULL_PROFILE_FAIL: return fetchFullProfileFail(state, action);
    case actionTypes.CLEAR_PROFILE_SUMMARY: return clearProfileSummary(state,action);
    case actionTypes.CLEAR_PUBLIC_PROFILE: return clearPublicProfile(state,action);
    case actionTypes.CLEAR_MANY_PROFILES: return clearManyProfiles(state,action);
    case actionTypes.LOGOUT_CLEAR_USERS: return logoutClearUsers(state,action);
    default:
      return state;
  }
};

export default reducer;
