import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profileImage: null,
  coverImage: null,
  firstName: null,
  lastName: null,
  birthday: null,
  location: null,
  firebaseKey: null,
  userId: null,
  error: null,
  profileLoading: false,
  contentEntryLoading: false
};

const loadProfileInit = (state,action) => {
  return {
    ...state,
    profileLoading: true
  }
}

const updateProfileInit = (state,action) => {
  return { 
    ...state,
    contentEntryLoading: true,
  }
}

const updateProfileFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    contentEntryLoading: false
  }
}

const createProfileSuccess = (state,action) => {
  return {
    ...state,
    firstName: action.userData.firstName,
    lastName: action.userData.lastName,
    birthday: action.userData.birthday,
    userId: action.userData.userId,
    firebaseKey: action.userData.key,
    profileLoading: false
  }
}

const fetchProfileSuccess = (state, action) => {
  return {
    ...state,
    profileImage: action.userData.profileImage || null,
    coverImage: action.userData.coverImage || null,
    firstName: action.userData.firstName || null,
    lastName: action.userData.lastName || null,
    gender: action.userData.gender || null,
    birthday: action.userData.birthday || null,
    occupations: action.userData.occupations || null,
    education: action.userData.education || null,
    relationships: action.userData.relationships || null,
    family: action.userData.family || null,
    currLocation: action.userData.currLocation || null,
    pastLocations: action.userData.pastLocations || null,
    hometown: action.userData.hometown || null,
    contacts: action.userData.contacts || null,
    firebaseKey: action.userData.key || null,
    userId: action.userData.userId || null,
    profileLoading: false,
  };
};

const updateProfileSuccess = (state,action) => {
  return {
    ...state,
    profileImage: action.userData.profileImage || null,
    coverImage: action.userData.coverImage || null,
    firstName: action.userData.firstName || null,
    lastName: action.userData.lastName || null,
    gender: action.userData.gender || null,
    birthday: action.userData.birthday || null,
    occupations: action.userData.occupations || null,
    education: action.userData.education || null,
    relationships: action.userData.relationships || null,
    family: action.userData.family || null,
    currLocation: action.userData.currLocation || null,
    pastLocations: action.userData.pastLocations || null,
    hometown: action.userData.hometown || null,
    contacts: action.userData.contacts || null,
    firebaseKey: action.userData.key || null,
    userId: action.userData.userId || null,
    contentEntryLoading: false,
  }
}

const clearProfile = (state,action) => {
  return {
    ...initialState
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_PROFILE_INIT: return loadProfileInit(state,action);
    case actionTypes.UPDATE_PROFILE_INIT: return updateProfileInit(state, action);
    case actionTypes.CREATE_PROFILE_SUCCESS: return createProfileSuccess(state, action);
    case actionTypes.FETCH_PROFILE_SUCCESS: return fetchProfileSuccess(state, action);
    case actionTypes.UPDATE_PROFILE_SUCCESS: return updateProfileSuccess(state, action);
    case actionTypes.UPDATE_PROFILE_FAIL: return updateProfileFail(state,action);
    case actionTypes.CLEAR_PROFILE: return clearProfile(state,action);
    default:
      return state;
  }
};

export default reducer;
