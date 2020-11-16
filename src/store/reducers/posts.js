import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  loadingNewPost: false,
  loadingNewComment: false,
  loadingNewReply: false,
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

const addCommentInit = (state,action) => {
    return {
        ...state,
        loadingNewComment: true
    }
}

const addCommentSuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        loadingNewComment: false
    }
}

const addCommentFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        loadingNewComment: false,
    }
}

const addReplyInit = (state,action) => {
    return {
        ...state,
        loadingNewReply: true
    }
}

const addReplySuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        loadingNewReply: false
    }
}

const addReplyFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        loadingNewReply: false
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

const fetchFriendsPostsSuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        loadingFriendPosts: false
    }
}

const fetchFriendsPostsFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        loadingFriendPosts: false
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
      case actionTypes.ADD_COMMENT_INIT: return addCommentInit(state,action);
      case actionTypes.ADD_COMMENT_SUCCESS: return addCommentSuccess(state,action);
      case actionTypes.ADD_COMMENT_FAIL: return addCommentFail(state,action);
    default:
        return state
  }
};

export default reducer;