import * as actionTypes from '../actions/actionTypes'

const initialState = {
  friends: [],
  sentRequests: [],
  receivedRequests: [],
  sendingFriendRequest: false,
  cancelingFriendRequest: false,
  error: null
};

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


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_FRIEND_REQUEST_INIT: return sendFriendRequestInit(state,action);
    case actionTypes.SEND_FRIEND_REQUEST_SUCCESS: return sendFriendRequestSuccess(state,action);
    case actionTypes.SEND_FRIEND_REQUEST_FAIL: return sendFriendRequestFail(state,action);
    case actionTypes.CANCEL_FRIEND_REQUEST_INIT: return cancelFriendRequestInit(state,action);
    case actionTypes.CANCEL_FRIEND_REQUEST_SUCCESS: return cancelFriendRequestSuccess(state,action);
    case actionTypes.CANCEL_FRIEND_REQUEST_FAIL: return cancelFriendRequestFail(state,action);
    default:
      return state;
  }
};

export default reducer;
