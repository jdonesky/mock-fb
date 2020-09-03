import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: [],
  usersLoading: false,
  requestLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
