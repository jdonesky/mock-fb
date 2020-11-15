import * as actionTypes from "./actionTypes";
import axios from '../../axios/db-axios-instance'
import {KeyGenerator} from "../../shared/utility";

const addPostInit = () => {
    return {
        type: actionTypes.ADD_POST_INIT
    }
}

const addFirstPostAttempt = (authToken, postsKey, post) => {
    return dispatch => {
        dispatch(addPostInit());
        KeyGenerator.getKey(authToken, (newKey) => {
            axios.post(`/posts/${postsKey}.json?auth=${authToken}`, {...post, id: newKey})
                .then(response => {
                    dispatch(addPostSuccess(post))
                })
                .catch(error => {
                    dispatch(addPostFail(error))
                })
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
