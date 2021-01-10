import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profileImage: null,
  coverImage: null,
  firstName: null,
  lastName: null,
  birthday: null,
  location: null,
  firebaseKey: null,
  postsKey: null,
  publicProfileKey: null,
  publicProfile: null,
  activityLogKey: null,
  activeChat: null,
  userId: null,
  error: null,
  profileLoading: false,
  publicProfileLoading: false,
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
    firebaseKey: action.userData.userKey,
    postsKey: action.userData.postsKey,
    publicProfileKey: action.userData.publicProfileKey,
    activityLogKey: action.userData.activityLogKey,
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
    bio: action.userData.bio || null,
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
    lifeEvents: action.userData.lifeEvents || null,
    posts: action.userData.posts || null,
    activeChat: action.userData.activeChat || null,
    firebaseKey: action.userData.key || null,
    postsKey: action.userData.postsKey || null,
    userId: action.userData.userId || null,
    publicProfileKey: action.userData.publicProfileKey || null,
    activityLogKey: action.userData.activityLogKey || null,
    publicProfile: action.userData.publicProfile || null,
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
    bio: action.userData.bio || null,
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
    lifeEvents: action.userData.lifeEvents || null,
    posts: action.userData.posts || null,
    activeChat: action.userData.activeChat || null,
    userId: action.userData.userId || null,
    publicProfileKey: action.userData.publicProfileKey || null,
    activityLogKey: action.userData.activityLogKey || null,
    publicProfile: action.userData.publicProfile || null,
    contentEntryLoading: false,
  }
}

const fetchMyPublicProfileInit = (state,action) => {
  return {
    ...state,
    publicProfileLoading: true
  }
}

const fetchMyPublicProfileSuccess = (state,action) => {
  return {
    ...state,
    publicProfile: action.profile,
    publicProfileLoading: false
  }
}

const fetchMyPublicProfileFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    publicProfileLoading: false
  }
}

const likePageSuccessFeedback = (state,action) => {
  return {
    ...state,
    publicProfile: action.publicProfile
  }
}

const startChatSuccessFeedBack = (state,action) => {
  return {
    ...state,
    activeChat: action.chat
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
    case actionTypes.FETCH_MY_PUBLIC_PROFILE_INIT: return fetchMyPublicProfileInit(state,action);
    case actionTypes.FETCH_MY_PUBLIC_PROFILE_SUCCESS: return fetchMyPublicProfileSuccess(state,action);
    case actionTypes.FETCH_MY_PUBLIC_PROFILE_FAIL: return fetchMyPublicProfileFail(state,action);
    case actionTypes.LIKE_PAGE_SUCCESS_FEEDBACK: return likePageSuccessFeedback(state,action);
    case actionTypes.START_CHAT_SUCCESS_FEEDBACK: return startChatSuccessFeedBack(state,action);
    case actionTypes.CLEAR_PROFILE: return clearProfile(state,action);
    default:
      return state;
  }
};

export default reducer;
