import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  loadingNewPost: false,
  loadingSelfPosts: false,
  loadingFriendPosts: false,
  error: null,
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

const fetchSelfPostsInit = (state,action) => {
    return {
        ...state,
        loadingSelfPosts: true
    }
}

const fetchSelfPostsSuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        loadingSelfPosts: false,
    }
}

const fetchSelfPostsFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        loadingSelfPosts: false,
    }
}

const fetchFriendsPostsInit = (state,action) => {
    return {
        ...state,
        loadingFriendPosts: true
    }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.FETCH_SELF_POSTS_INIT: return fetchSelfPostsInit(state,action);
      case actionTypes.FETCH_SELF_POSTS_SUCCESS: return fetchSelfPostsSuccess(state,action);
      case actionTypes.FETCH_SELF_POSTS_FAIL: return fetchSelfPostsFail(state,action);
      case actionTypes.ADD_POST_INIT: return addPostInit(state,action);
      case actionTypes.ADD_POST_SUCCESS: return addPostSuccess(state,action);
      case actionTypes.ADD_POST_FAIL: return addPostFail(state,action);
    default:
        return state
  }
};

export default reducer;