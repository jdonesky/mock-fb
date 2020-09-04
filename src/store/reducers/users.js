import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [],
  usersLoading: false,
  requestLoading: false,
  error: null,
};

const fetchUsersInit = (state, action) => {
  return {
    ...state,
    usersLoading: true,
  };
};

const fetchUsersSuccess = (state, action) => {
  const users = Object.keys(action.users).map((key) => {
    return {
      dbKey: key,
      name: action.users[key].name,
      profileImage: action.users[key].uploadedImage,
    };
  });
  return {
    ...state,
    users: users,
    usersLoading: false,
  };
};

const fetchUsersFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    usersLoading: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_INIT: return fetchUsersInit(state, action);
    case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
