import * as actionTypes from "./actionTypes";
import axios from '../../axios/db-axios-instance'
import {KeyGenerator} from "../../shared/utility";

const addPostInit = () => {
    return {
        type: actionTypes.ADD_POST_INIT
    }
}

export const addPostAttempt = (authToken, postsKey, post) => {
    return dispatch => {
        dispatch(addPostInit());
        KeyGenerator.getKey(authToken, (newKey) => {
            const url = `/posts/${postsKey}.json?auth=${authToken}`
            axios.get(url)
                .then(response => {
                    console.log(response.data)
                    const newPosts = [...response.data, {...post, id: newKey}]
                    axios.put(url, newPosts)
                        .then(response => {
                            console.log('PUT NEW POST SUCCESSFULLY')
                            dispatch(addPostSuccess(newPosts))
                        })
                        .catch(error => {
                            console.log('PUT NEW POST FAILED')
                            dispatch(addPostFail(error))
                        })
                })
                .catch(error => {
                    console.log(error)
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

const fetchSelfPostsInit = () => {
    return {
        type: actionTypes.FETCH_SELF_POSTS_INIT,
    }
}

export const fetchSelfPostsAttempt = (authToken, postsKey) => {
    return dispatch => {
        dispatch(fetchSelfPostsInit())
        axios.get(`/posts/${postsKey}.json?auth=${authToken}`)
            .then(response => {
                console.log(response.data);
               dispatch(fetchSelfPostsSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
               dispatch(fetchSelfPostsFail(error))
            })
    }
}

const fetchSelfPostsSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_SELF_POSTS_SUCCESS,
        posts: posts
    }
}

const fetchSelfPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_SELF_POSTS_FAIL,
        error: error
    }
}

const fetchFriendsPostsInit = () => {
    return {
        type: actionTypes.FETCH_FRIENDS_POSTS_INIT
    }
}


const fetchFriendsPostsAttempt = () => {
    return dispatch => {
        dispatch(fetchFriendsPostsInit())
    }
}

const fetchFriendsPostsSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_FRIENDS_POSTS_SUCCESS,
        posts: posts
    }
}

const fetchFriendsPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_FRIENDS_POSTS_FAIL,
        error: error
    }
}



