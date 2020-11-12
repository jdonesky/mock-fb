import * as actionTypes from "./actionTypes";
import axios from '../../axios/db-axios-instance'

const addPostInit = () => {
    return {
        type: actionTypes.ADD_POST_INIT
    }
}

const addFirstPostAttempt = (authToken, post) => {
    return dispatch => {
        dispatch(addPostInit());
        axios.post(`/posts.json?auth=${authToken}`, post)
            .then(response => {

            })
    }
}

const addPostSuccess = (newPosts) => {
    return {
        type: actionTypes.ADD_POST_SUCCESS,
        posts: newPosts
    }
}

const addPostFail = (error) => {
    return {
        type: actionTypes.ADD_POST_FAIL,
        error: error
    }
}



// const fetchPostsInit = () => {
//   return {
//     type: actionTypes.FETCH_POSTS_INIT
//   };
// };
//
// const fetchPostsSuccess = (posts) => {
//   return {
//     type: actionTypes.FETCH_POSTS_SUCCESS,
//     posts: posts,
//   };
// };
//
// const fetchPostsFail = (error) => {
//   return {
//     type: actionTypes.FETCH_POSTS_FAIL,
//     error: error,
//   };
// };
//
// export const fetchPostsAttempt = (db, userId=null) => {
//   return (dispatch) => {
//     dispatch(fetchPostsInit());
//     let queryUrl = "/" + db + '.json'
//     if (userId) {
//       queryUrl = queryUrl + '?orderBy="userId"&equalTo="' + userId + '"'
//     }
//     axios.get(queryUrl)
//     .then((response) => {
//       const posts = Object.keys(response.data)
//       .map((key) => {
//         return { key: key, ...response.data[key] };
//       });
//
//       dispatch(fetchPostsSuccess(posts));
//     })
//     .catch(error => {
//         dispatch(fetchPostsFail(error))
//     });
//   };
// };
