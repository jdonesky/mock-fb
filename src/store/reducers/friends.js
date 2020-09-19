import * as actionTypes from '../actions/actionTypes'

const initialState = {
  friends: [],
  friendRequests: [],
  loading: false,
  error: null
};

const fetchFriendsInit = (state,action) => {
  return {
    ...state,
    loading: true
  }
}

const fetchFriendsSuccess = (state,action) => {
  return {
    ...state,
    friends: action.friends,
    loading: false
  }
}

const fetchFriendsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FRIENDS_INIT: return fetchFriendsInit(state,action);
    case actionTypes.FETCH_FRIENDS_SUCCESS: return fetchFriendsSuccess(state,action);
    case actionTypes.FETCH_FRIENDS_FAIL: return fetchFriendsFail(state,action);
    default:
      return state;
  }
};

export default reducer;
