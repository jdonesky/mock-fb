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
  userId: null,
  error: null,
  activeChat: null,
  removedMessageKey: null,
  noActiveChat: false,
  startingChat: false,
  restartingChat: false,
  fetchingActiveChat: false,
  clearingActiveChat: false,
  removingFromNewMessages: false,
  profileLoading: false,
  publicProfileLoading: false,
  contentEntryLoading: false,
  notificationToken: null,
  savingNotificationToken: false,
};

const saveNotificationTokenInit = (state,action) => {
  return {
    ...state,
    savingNotificationToken: true
  }
}

const saveNotificationTokenSuccess = (state,action) => {
  return {
    ...state,
    notificationToken: action.token,
    savingNotificationToken: false
  }
}

const saveNotificationTokenFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    savingNotificationToken: false
  }
}


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
    userId: action.userData.userId || null,
    publicProfileKey: action.userData.publicProfileKey || null,
    activityLogKey: action.userData.activityLogKey || null,
    publicProfile: action.userData.publicProfile || null,
    fetchingActiveChat: false,
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

const startNewChatInit = (state,action) => {
  return {
    ...state,
    startingChat: true
  }
}

const startNewChatSuccess = (state,action) => {
  return {
    ...state,
    activeChat: action.chat,
    publicProfile: action.publicProfile,
    startingChat: false
  }
}

const startNewChatFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    startingChat: false
  }
}


const restartOldChatInit = (state,action) => {
  return {
    ...state,
    restartingChat: true
  }
}

const restartOldChatSuccess = (state,action) => {
  return {
    ...state,
    activeChat: action.chat,
    restartingChat: false
  }
}

const restartOldChatFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    restartingChat: false
  }
}


const fetchActiveChatInit = (state,action) => {
  return {
    ...state,
    fetchingActiveChat: true,
    noActiveChat: false
  }
}

const fetchActiveChatSuccess = (state,action) => {
  return {
    ...state,
    activeChat: action.chat,
    fetchingActiveChat: false
  }
}

const fetchActiveChatFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    fetchingActiveChat: false,
    noActiveChat: true
  }
}

const clearActiveChatInit = (state,action) => {
  return {
    ...state,
    clearingActiveChat: true,
    noActiveChat: false
  }
}

const clearActiveChatSuccess = (state,action) => {
  return {
    ...state,
    activeChat: null,
    clearingActiveSuccess: false,
    noActiveChat: true
  }
}

const clearActiveChatFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    clearingActiveSuccess: false,
    noActiveChat: true
  }
}

const removeFromNewMessagesInit = (state,action) => {
  return {
    ...state,
    removingFromNewMessages: true
  }
}

const removeFromNewMessagesSuccess = (state,action) => {
  return {
    ...state,
    removedMessageKey: action.key,
    removingFromNewMessages: false
  }
}

const removeFromNewMessagesFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    removingFromNewMessages: false
  }
}

const clearLocalActiveChat = (state,action) => {
  return {
    ...state,
    activeChat: null
  }
}


const logoutClearProfile = (state,action) => {
  return initialState
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_NOTIFICATION_TOKEN_INIT: return saveNotificationTokenInit(state,action);
    case actionTypes.SAVE_NOTIFICATION_TOKEN_SUCCESS: return saveNotificationTokenSuccess(state,action);
    case actionTypes.SAVE_NOTIFICATION_TOKEN_FAIL: return saveNotificationTokenFail(state,action);
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
    case actionTypes.START_NEW_CHAT_INIT: return startNewChatInit(state,action);
    case actionTypes.START_NEW_CHAT_SUCCESS: return startNewChatSuccess(state,action);
    case actionTypes.START_NEW_CHAT_FAIL: return startNewChatFail(state,action);
    case actionTypes.RESTART_OLD_CHAT_INIT: return restartOldChatInit(state,action);
    case actionTypes.RESTART_OLD_CHAT_SUCCESS: return restartOldChatSuccess(state,action);
    case actionTypes.RESTART_OLD_CHAT_FAIL: return restartOldChatFail(state,action);
    case actionTypes.FETCH_ACTIVE_CHAT_INIT: return fetchActiveChatInit(state,action);
    case actionTypes.FETCH_ACTIVE_CHAT_SUCCESS: return fetchActiveChatSuccess(state,action);
    case actionTypes.FETCH_ACTIVE_CHAT_FAIL: return fetchActiveChatFail(state,action);
    case actionTypes.CLEAR_ACTIVE_CHAT_INIT: return clearActiveChatInit(state,action);
    case actionTypes.CLEAR_ACTIVE_CHAT_SUCCESS: return clearActiveChatSuccess(state,action);
    case actionTypes.REMOVE_FROM_NEW_MESSAGES_INIT: return removeFromNewMessagesInit(state,action);
    case actionTypes.REMOVE_FROM_NEW_MESSAGES_SUCCESS: return removeFromNewMessagesSuccess(state,action);
    case actionTypes.REMOVE_FROM_NEW_MESSAGES_FAIL: return removeFromNewMessagesFail(state,action);
    case actionTypes.CLEAR_ACTIVE_CHAT_FAIL: return clearActiveChatFail(state,action);
    case actionTypes.CLEAR_LOCAL_ACTIVE_CHAT: return clearLocalActiveChat(state,action);
    case actionTypes.LOGOUT_CLEAR_PROFILE: return logoutClearProfile(state,action);
    default:
      return state;
  }
};

export default reducer;
