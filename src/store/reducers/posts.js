import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  othersPosts: [],
  loadingNewPost: false,
  editingPost: false,
  deletingPost: false,
  addingPostReaction: false,
  editingPostReaction: false,
  loadingNewComment: false,
  editingComment: false,
  deletingComment: false,
  loadingNewReply: false,
  editingReply: false,
  deletingReply: false,
  loadingSelfPosts: false,
  loadingOthersPosts: false,
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

const editPostInit = (state,action) => {
    return {
        ...state,
        editingPost: true
    }
}

const editPostSuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        editingPost: false
    }
}

const editPostFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        editingPost: false

    }
}

const deletePostInit = (state,action) => {
    return {
        ...state,
        deletingPosts: true
    }
}

const deletePostSuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        deletingPost: false
    }
}

const deletePostFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        deletingPost: false
    }
}

const addPostReactionInit = (state,action) => {
    return {
        ...state,
        addingPostReaction: true
    }
}

const addPostReactionSuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        addingPostReaction: false
    }
}

const addPostReactionFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        addingPostReaction: false
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

const editCommentInit = (state,action) => {
    return {
        ...state,
        editingComment: true
    }
}

const editCommentSuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        editingComment: false
    }
}

const editCommentFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        editingComment: false
    }
}

const deleteCommentInit = (state,action) => {
    return {
        ...state,
        deletingComment: true
    }
}

const deleteCommentSuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        deletingComment: false
    }
}

const deleteCommentFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        deletingComment: false
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

const editReplyInit = (state,action) => {
    return {
        ...state,
        editingReply: true
    }
}

const editReplySuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        editingReply: false
    }
}

const editReplyFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        editingReply: true
    }
}

const deleteReplyInit = (state,action) => {
    return {
        ...state,
        deletingReply: true
    }
}

const deleteReplySuccess = (state,action) => {
    return {
        ...state,
        posts: action.posts,
        deletingReply: false
    }
}

const deleteReplyFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        deletingReply: false
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

const fetchOthersPostsInit = (state,action) => {
    return {
        ...state,
        loadingOthersPosts: true
    }
}

const fetchOthersPostsSuccess = (state,action) => {
    return {
        ...state,
        othersPosts: action.posts,
        loadingOthersPosts: false
    }
}

const fetchOthersPostsFail = (state,action) => {
    return {
        ...state,
        error: action.error,
        loadingOthersPosts: false
    }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.FETCH_SELF_POSTS_INIT: return fetchSelfPostsInit(state,action);
      case actionTypes.FETCH_SELF_POSTS_SUCCESS: return fetchSelfPostsSuccess(state,action);
      case actionTypes.FETCH_SELF_POSTS_FAIL: return fetchSelfPostsFail(state,action);
      case actionTypes.FETCH_OTHERS_POSTS_INIT: return fetchOthersPostsInit(state,action);
      case actionTypes.FETCH_OTHERS_POSTS_SUCCESS: return fetchOthersPostsSuccess(state,action);
      case actionTypes.FETCH_OTHERS_POSTS_FAIL: return fetchOthersPostsFail(state,action);
      case actionTypes.ADD_POST_INIT: return addPostInit(state,action);
      case actionTypes.ADD_POST_SUCCESS: return addPostSuccess(state,action);
      case actionTypes.ADD_POST_FAIL: return addPostFail(state,action);
      case actionTypes.EDIT_POST_INIT: return editPostInit(state,action);
      case actionTypes.EDIT_POST_SUCCESS: return editPostSuccess(state,action);
      case actionTypes.EDIT_POST_FAIL: return editPostFail(state,action);
      case actionTypes.DELETE_POST_INIT: return deletePostInit(state,action);
      case actionTypes.DELETE_POST_SUCCESS: return deletePostSuccess(state,action);
      case actionTypes.DELETE_POST_FAIL: return deletePostFail(state,action);
      case actionTypes.ADD_POST_REACTION_INIT: return addPostReactionInit(state, action);
      case actionTypes.ADD_POST_REACTION_SUCCESS: return addPostReactionSuccess(state, action);
      case actionTypes.ADD_POST_REACTION_FAIL: return addPostReactionFail(state, action);
      case actionTypes.ADD_COMMENT_INIT: return addCommentInit(state,action);
      case actionTypes.ADD_COMMENT_SUCCESS: return addCommentSuccess(state,action);
      case actionTypes.ADD_COMMENT_FAIL: return addCommentFail(state,action);
      case actionTypes.EDIT_COMMENT_INIT: return editCommentInit(state,action);
      case actionTypes.EDIT_COMMENT_SUCCESS: return editCommentSuccess(state,action);
      case actionTypes.EDIT_COMMENT_FAIL: return editCommentFail(state,action);
      case actionTypes.DELETE_COMMENT_INIT: return deleteCommentInit(state,action);
      case actionTypes.DELETE_COMMENT_SUCCESS: return deleteCommentSuccess(state,action);
      case actionTypes.DELETE_COMMENT_FAIL: return deleteCommentFail(state,action);
      case actionTypes.ADD_REPLY_INIT: return addReplyInit(state,action);
      case actionTypes.ADD_REPLY_SUCCESS: return addReplySuccess(state,action);
      case actionTypes.ADD_REPLY_FAIL: return addReplyFail(state,action);
      case actionTypes.EDIT_REPLY_INIT: return editReplyInit(state,action);
      case actionTypes.EDIT_REPLY_SUCCESS: return editReplySuccess(state,action);
      case actionTypes.EDIT_REPLY_FAIL: return editReplyFail(state,action);
      case actionTypes.DELETE_REPLY_INIT: return deleteReplyInit(state,action);
      case actionTypes.DELETE_REPLY_SUCCESS: return deleteReplySuccess(state,action);
      case actionTypes.DELETE_REPLY_FAIL: return deleteReplyFail(state,action);
    default:
        return state
  }
};

export default reducer;