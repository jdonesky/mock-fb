import * as actionTypes from '../actions/actionTypes'

const initialState = {
  friends: [],
  sentRequests: [],
  receivedRequests: [],
  sendingFriendRequest: false,
  cancelingFriendRequest: false,
  acceptingFriendRequest: false,
  denyingFriendRequest: false,
  fetchingFriendRequests: false,
  fetchingFriends: false,
  error: null
};

const fetchFriendsInit = (state,action) => {
  return {
    ...state,
    fetchingFriends: true
  }
}

const fetchFriendsSuccess = (state,action) => {
  return {
    ...state,
    friends: action.friends,
    fetchingFriends: false
  }
}

const fetchFriendsFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    fetchingFriends: false
  }
}

const fetchFriendRequestsInit = (state,action) => {
  return {
    ...state,
    fetchingFriendRequests: true
  }
}

const fetchFriendRequestsSuccess = (state,action) => {
  return {
    ...state,
    sentRequests: action.requests.sent || [],
    receivedRequests: action.requests.received || [],
    fetchingFriendRequests: false
  }
}

const fetchFriendRequestsFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    fetchingFriendRequests: false
  }
}

const sendFriendRequestInit = (state,action) => {
  return {
    ...state,
    sendingFriendRequest: true
  }
}

const sendFriendRequestSuccess = (state,action) => {
  return {
    ...state,
    sendingFriendRequest: false
  }
}

const sendFriendRequestFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    sendingFriendRequest: false
  }
}

const cancelFriendRequestInit = (state,action) => {
  return {
    ...state,
    cancelingFriendRequest: true
  }
}

const cancelFriendRequestSuccess = (state,action) => {
  return {
    ...state,
    sentRequests: action.sentRequests,
    cancelingFriendRequest: false
  }
}

const cancelFriendRequestFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    cancelingFriendRequest: false
  }
}

const acceptFriendRequestInit = (state,action) => {
  return {
    ...state,
    acceptingFriendRequest: true
  }
}

const acceptFriendRequestSuccess = (state,action) => {
  return {
    ...state,
    receivedRequests: action.receivedRequests,
    friends: action.friends,
    acceptingFriendRequest: false
  }
}

const acceptFriendRequestFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    acceptingFriendRequest: false
  }
}


const denyFriendRequestInit = (state,action) => {
  return {
    ...state,
    denyingFriendRequest: true
  }
}

const denyFriendRequestSuccess = (state,action) => {
  return {
    ...state,
    receivedRequests: action.receivedRequests,
    denyingFriendRequest: false
  }
}

const denyFriendRequestFail = (state,action) => {
  return {
    ...state,
    error: action.error,
    denyingFriendRequest: false
  }
}

const clearFriends = (state,action) => {
  return {
    ...state,
    friends: []
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FRIENDS_INIT: return fetchFriendsInit(state,action);
    case actionTypes.FETCH_FRIENDS_SUCCESS: return fetchFriendsSuccess(state,action);
    case actionTypes.FETCH_FRIENDS_FAIL: return fetchFriendsFail(state,action);
    case actionTypes.FETCH_FRIEND_REQUESTS_INIT: return fetchFriendRequestsInit(state,action);
    case actionTypes.FETCH_FRIEND_REQUESTS_SUCCESS: return fetchFriendRequestsSuccess(state,action);
    case actionTypes.FETCH_FRIEND_REQUESTS_FAIL: return fetchFriendRequestsFail(state,action);
    case actionTypes.SEND_FRIEND_REQUEST_INIT: return sendFriendRequestInit(state,action);
    case actionTypes.SEND_FRIEND_REQUEST_SUCCESS: return sendFriendRequestSuccess(state,action);
    case actionTypes.SEND_FRIEND_REQUEST_FAIL: return sendFriendRequestFail(state,action);
    case actionTypes.CANCEL_FRIEND_REQUEST_INIT: return cancelFriendRequestInit(state,action);
    case actionTypes.CANCEL_FRIEND_REQUEST_SUCCESS: return cancelFriendRequestSuccess(state,action);
    case actionTypes.CANCEL_FRIEND_REQUEST_FAIL: return cancelFriendRequestFail(state,action);
    case actionTypes.ACCEPT_FRIEND_REQUEST_INIT: return acceptFriendRequestInit(state,action);
    case actionTypes.ACCEPT_FRIEND_REQUEST_SUCCESS: return acceptFriendRequestSuccess(state,action);
    case actionTypes.ACCEPT_FRIEND_REQUEST_FAIL: return acceptFriendRequestFail(state,action);
    case actionTypes.DENY_FRIEND_REQUEST_INIT: return denyFriendRequestInit(state,action);
    case actionTypes.DENY_FRIEND_REQUEST_SUCCESS: return denyFriendRequestSuccess(state,action);
    case actionTypes.DENY_FRIEND_REQUEST_FAIL: return denyFriendRequestFail(state,action);
    case actionTypes.CLEAR_FRIENDS: return clearFriends(state,action);
    default:
      return state;
  }
};

export default reducer;
