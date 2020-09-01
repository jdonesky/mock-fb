import * as actionTypes from "./actionTypes";

const fetchPostsInit = () => {
  return {
    type: actionTypes.FETCH_POSTS_INIT,
  };
};

const fetchPostsSuccess = (posts) => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    posts: posts,
  };
};

const fetchPostsFail = (error) => {
  return {
    type: actionTypes.FETCH_POSTS_FAIL,
    error: error,
  };
};

export const fetchPostsAttempt = (authToken, db) => {
  return (dispatch) => {
    dispatch(fetchPostsInit());
    const queryUrl = "/" + db + ".json?auth=" + authToken;
    axios.get(queryUrl)
    .then((response) => {
      console.log(response.data);
      const posts = Object.keys(response.data)
      .map((key) => {
        return { key: key, ...response.data[key] };
      });
      console.log(posts)
      dispatch(fetchPostsSuccess(posts));
    })
    .catch(error => {
        dispatch(fetchPostsFail(error))
    });
  };
};
