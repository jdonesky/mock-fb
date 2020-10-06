import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profileImage: null,
  firstName: null,
  lastName: null,
  name: null,
  birthday: null,
  location: null,
  status: null,
  error: null,
  firebaseKey: null,
  profileLoading: false,
  statusLoading: false
};

const updateProfileInit = (state,action) => {
  return { 
    ...state,
    profileLoading: true,
  }
}

const createProfileSuccess = (state,action) => {
  return {
    ...state,
    firstName: action.userData.firstName,
    lastName: action.userData.lastName,
    birthday: action.userData.birthday,
    firebaseKey: action.userData.key,
    profileLoading: false
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

const updateProfileFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    profileLoading: false
  }
}

const updateProfileSuccess = (state, action) => {
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
    case actionTypes.CREATE_PROFILE_SUCCESS: return createProfileSuccess(state,action);
    case actionTypes.FETCH_PROFILE_SUCCESS: return updateProfileSuccess(state, action);
    case actionTypes.FETCH_PROFILE_FAIL: return fetchProfileFail(state, action);
    case actionTypes.UPDATE_PROFILE_INIT: return updateProfileInit(state,action)
    case actionTypes.UPDATE_PROFILE_SUCCESS: return storeProfileSuccess(state,action);
    case actionTypes.UPDATE_PROFILE_FAIL: return updateProfileFail(state,action);
    case actionTypes.STATUS_UPDATE_INIT: return statusUpdateInit(state,action);
    case actionTypes.STATUS_UPDATE_SUCCESS: return statusUpdateSuccess(state, action);
    case actionTypes.STATUS_UPDATE_FAIL: return statusUpdateFail(state,action);
    case actionTypes.CLEAR_PROFILE: return clearProfile(state,action)
    default:
      return state;
  }
};

export default reducer;
