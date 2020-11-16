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

const addCommentInit = () => {
    return {
        type: actionTypes.ADD_COMMENT_INIT
    }
}

export const addCommentAttempt = (authToken, postsKey, id, comment) => {
    return dispatch => {
        dispatch(addCommentInit());
        const url = `/posts/${postsKey}.json?auth=${authToken}`
        KeyGenerator.getKey(authToken, (newKey) => {
            const newComment = {...comment, id: newKey}
            axios.get(url)
                .then(response => {
                    const newPosts = [...response.data]
                    const targetPostIndex = response.data.findIndex(post => post.id === id);
                    const targetPost = response.data.find(post => post.id === id);
                    let targetPostComments;
                    if (targetPost.comments && targetPost.comments.length) {
                        targetPostComments = [ ...targetPost.comments, newComment ];
                    } else {
                        targetPostComments = [newComment];
                    }
                    targetPost.comments = targetPostComments;
                    newPosts[targetPostIndex] = targetPost;
                    axios.put(url,newPosts)
                        .then(response => {
                            dispatch(addCommentSuccess(newPosts))
                        })
                        .catch(error => {
                            dispatch(addCommentFail(error))
                        })
                })
                .catch(error => {
                    dispatch(addCommentFail(error))
                })
        })


    }
}

const addCommentSuccess = (posts) => {
    return {
        type: actionTypes.ADD_COMMENT_SUCCESS,
        posts: posts
    }
}

const addCommentFail = (error) => {
    return {
        type: actionTypes.ADD_COMMENT_FAIL,
        error: error
    }
}

const addReplyInit = () => {
    return {
        type: actionTypes.ADD_REPLY_INIT
    }
}

export const addReplyAttempt = (authToken, postsKey, postId, commentId, reply) => {
    return dispatch => {
        addReplyInit();
        KeyGenerator.getKey(authToken, (newKey) => {
            const newReply = {...reply, id: newKey}

        })
    }
}

const addReplySuccess = (posts) => {
    return {
        type: actionTypes.ADD_REPLY_SUCCESS,
        posts: posts
    }
}

const addReplyFail = (error) => {
    return {
        type: actionTypes.ADD_REPLY_FAIL,
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



