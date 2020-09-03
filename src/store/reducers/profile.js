import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profileImage: null,
  name: null,
  age: null,
  location: null,
  status: null,
  error: null,
  firebaseKey: null,
  fetched: false,
  profileLoading: false,
  statusLoading: false
};

const updateProfileInit = (state,action) => {
  return { 
    ...state,
    profileLoading: true,
    fetched: false
  }
}

const storeProfileSuccess = (state, action) => {
  return {
    ...state,
    profileImage: action.userProfile.profileImage,
    name: action.userProfile.name,
    age: action.userProfile.age,
    location: action.userProfile.location,
    profileLoading: false
  };
};

const storeProfileFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    profileLoading: false
  }
}

const fetchProfileSuccess = (state, action) => {
  return {
    ...state,
    profileImage: action.userData.uploadedImage,
    name: action.userData.name,
    age: action.userData.age,
    location: action.userData.location,
    firebaseKey: action.userData.key,
    profileLoading: false,
    fetched: true,
  };
};

const fetchProfileFail = (state, action) => {
  return {
    ...state,
    error: action.err,
    profileLoading: false
  };
};


const statusUpdateInit = (state,action) => {
  return { 
    ...state,
    statusLoading: true,
    fetched: false
  }
}

const statusUpdateSuccess = (state, action) => {
  return {
    ...state,
    status: action.status,
    statusLoading: false
  };
};

const statusUpdateFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    statusLoading: false
  }
}

const clearProfile = (state,action) => {
  return {
    ...initialState
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROFILE_INIT: return updateProfileInit(state,action)
    case actionTypes.FETCH_PROFILE_SUCCESS: return fetchProfileSuccess(state, action);
    case actionTypes.FETCH_PROFILE_FAIL: return fetchProfileFail(state, action);
    case actionTypes.STORE_PROFILE_SUCCESS: return storeProfileSuccess(state,action);
    case actionTypes.STORE_PROFILE_FAIL: return storeProfileFail(state,action);
    case actionTypes.STATUS_UPDATE_INIT: return statusUpdateInit(state,action);
    case actionTypes.STATUS_UPDATE_SUCCESS: return statusUpdateSuccess(state, action);
    case actionTypes.STATUS_UPDATE_FAIL: return statusUpdateFail(state,action);
    case actionTypes.CLEAR_PROFILE: return clearProfile(state,action)
    default:
      return state;
  }
};

export default reducer;
