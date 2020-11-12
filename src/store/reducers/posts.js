import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  loadingNewPost: false,
  loadingPosts: false,
  error: null,
  postsKey: null
};

const addPostInit = (state,action) => {
    return {
        ...state,
        loadingNewPost: true
    }
}

const addPostSuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        loadingNewPost: false
    }
}

const addPostFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        loadingNewPost: false
    }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.ADD_POST_INIT: return addPostInit(state,action);
      case actionTypes.ADD_POST_SUCCESS: return addPostSuccess(state,action);
      case actionTypes.ADD_POST_FAIL: return addPostFail(state,action);
    default:
        return state
  }
};

export default reducer;