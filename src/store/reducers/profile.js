import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profileImage: null,
  name: null,
  age: null,
  location: null,
  status: null,
  error: null,
};

const storeProfileSuccess = (state, action) => {
  return {
    ...state,
    profileImage: action.userProfile.profileImage,
    name: action.userProfile.name,
    age: action.userProfile.age,
    location: action.userProfile.location,
  };
};

const storeProfileFail = (state,action) => {
  return {
    ...state,
    error: action.error
  }
}

const fetchProfileSuccess = (state, action) => {
  return {
    ...state,
    profileImage: action.userData.uploadedImage,
    name: action.userData.name,
    age: action.userData.age,
    location: action.userData.location,
  };
};

const fetchProfileFail = (state, action) => {
  return {
    ...state,
    error: action.err,
  };
};

const storeUserStatus = (state, action) => {
  return {
    ...state,
    status: action.status,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE_SUCCESS: return fetchProfileSuccess(state, action);
    case actionTypes.FETCH_PROFILE_FAIL: return fetchProfileFail(state, action);
    case actionTypes.STORE_PROFILE_SUCCESS: return storeProfileSuccess(state,action);
    case actionTypes.STORE_PROFILE_FAIL: return storeProfileFail(state,action);
    case actionTypes.STORE_USER_STATUS: return storeUserStatus(state, action);

    default:
      return state;
  }
};

export default reducer;
