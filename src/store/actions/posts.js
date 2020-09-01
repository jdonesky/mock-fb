import * as actionTypes from "./actionTypes";
import axios from '../../axios/db-axios-instance'

const fetchPostsInit = () => {
  return {
    type: actionTypes.FETCH_POSTS_INIT
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

export const fetchPostsAttempt = (db, userId=null) => {
  return (dispatch) => {
    dispatch(fetchPostsInit());
    let queryUrl = "/" + db
    if (userId) {
      queryUrl = queryUrl + '.json?orderBy="userId"&equalTo="' + userId + '"'
    }
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
