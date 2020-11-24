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
                    const newPosts = [...response.data, {...post, id: newKey}]
                    console.log('ADDING POST: newPosts after adding new post: ', newPosts)
                    axios.put(url, newPosts)
                        .then(response => {
                            dispatch(addPostSuccess(newPosts))
                        })
                        .catch(error => {
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

const editPostInit = () => {
    return {
        type: actionTypes.EDIT_POST_INIT
    }
}


export const editPostAttempt = (authToken, postsKey, postId, payload) => {
    return dispatch => {
        dispatch(editPostInit());
        const url = `/posts/${postsKey}.json?auth=${authToken}`;
        let newPosts;
        const editedPost = {...payload, id: postId};
        axios.get(url)
            .then(response => {
                newPosts = [...response.data];
                const targetPostIndex = newPosts.findIndex(post => post.id === postId);
                newPosts[targetPostIndex] = editedPost;
                return axios.put(url, newPosts);
            })
            .then(response => {
                dispatch(editPostSuccess(newPosts));
            })
            .catch(error => {
                dispatch(editPostFail(error))
            })
    }
}

const editPostSuccess = (posts ) => {
    return {
        type: actionTypes.EDIT_POST_INIT,
        posts: posts
    }
}

const editPostFail = (error) => {
    return {
        type: actionTypes.EDIT_POST_INIT,
        error: error
    }
}

const deletePostInit = () => {
    return {
        type: actionTypes.DELETE_POST_INIT,
    }
}

export const deletePostAttempt = (authToken, postsKey, postId) => {
    return dispatch => {
        dispatch(deletePostInit());
        const url = `/posts/${postsKey}.json?auth=${authToken}`;
        let newPosts;
        axios.get(url)
            .then(response => {
                newPosts = [...response.data];
                const targetPostIndex = newPosts.findIndex(post => post.id === postId);
                newPosts.splice(targetPostIndex, 1);
                return axios.put(url, newPosts);
            })
            .then(response => {
                dispatch(deletePostSuccess(newPosts));
            })
            .catch(error => {
                dispatch(deletePostFail(error));
            })
    }
}

const deletePostSuccess = (posts) => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        posts: posts
    }
}

const deletePostFail = (error) => {
    return {
        type: actionTypes.DELETE_POST_FAIL,
        error: error
    }
}

const addPostReactionInit = () => {
    return {
        type: actionTypes.ADD_POST_REACTION_INIT
    }
}

export const addPostReactionAttempt = (authToken, postsKey, postId, reaction) => {
    return dispatch => {
        dispatch(addPostReactionInit())
        const url = `/posts/${postsKey}.json?auth=${authToken}`
        let newPosts;
        KeyGenerator.getKey(authToken, (newKey) => {
            const newReaction = {...reaction, id: newKey}
            axios.get(url)
                .then(response => {
                    newPosts = [...response.data];
                    const targetPostIndex = newPosts.findIndex(post => post.id === postId);
                    const targetPost = newPosts.find(post => post.id === postId);

                    let targetPostReactions;
                    if (targetPost.reactions && targetPost.reactions.length) {
                        targetPostReactions = [...targetPost.reactions, newReaction]
                    } else {
                        targetPostReactions = [newReaction]
                    }

                    targetPost.reactions = targetPostReactions;
                    newPosts[targetPostIndex] = targetPost;
                    return axios.put(url, newPosts)
                })
                .then(response => {
                    dispatch(addPostReactionSuccess(newPosts));
                })
                .catch(error => {
                    dispatch(addPostReactionFail(error));
                })
        })
    }
}

const addPostReactionSuccess = (posts) => {
    return {
        type: actionTypes.ADD_POST_REACTION_INIT,
        posts: posts
    }
}

const addPostReactionFail = (error) => {
    return {
        type: actionTypes.ADD_POST_REACTION_INIT,
        error: error
    }
}

const editPostReactionInit = () => {
    return {
        type: actionTypes.EDIT_POST_REACTION_INIT
    }
}

export const editPostReactionAttempt = (authToken, postsKey, postId, reactionId, newReaction) => {
    return dispatch => {
        dispatch(editPostReactionInit())
        const url = `/posts/${postsKey}.json?auth=${authToken}`
        const newReaction = {...newReaction, id: reactionId}
        let newPosts;
        axios.get(url)
            .then(response => {
                newPosts = [...response.data];
                const targetPostIndex = newPosts.findIndex(post => post.id === postId);
                const targetPost = newPosts.find(post => post.id === postId);

                const targetPostReactions = [...targetPost.reactions];
                const targetReactionIndex = targetPostReactions.findIndex(reaction => reaction.id === reactionId);
                targetPostReactions[targetReactionIndex] = newReaction;

                targetPost.reactions = targetPostReactions;
                newPosts[targetPostIndex] = targetPostReactions;
                return axios.put(url, newPosts)
            })
            .then(response => {
                dispatch(editPostReactionSuccess(newPosts));
            })
            .catch(error => {
                dispatch(editPostReactionFail(error));
            })
    }
}

const editPostReactionSuccess = (posts) => {
    return {
        type: actionTypes.EDIT_POST_REACTION_INIT,
        posts: posts
    }
}

const editPostReactionFail = (error) => {
    return {
        type: actionTypes.EDIT_POST_REACTION_INIT,
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

const editCommentInit = () => {
    return {
        type: actionTypes.EDIT_COMMENT_INIT
    }
}

export const editCommentAttempt = (authToken, postsKey, postId, commentId, payload) => {
    return dispatch => {
        dispatch(editCommentInit())
        const url = `/posts/${postsKey}.json?auth=${authToken}`
        let newPosts;
        const newComment = {...payload}
        axios.get(url)
            .then(response => {
                newPosts = [...response.data];
                const targetPostIndex = newPosts.findIndex(post => post.id === postId);
                const targetPost = newPosts.find(post => post.id === postId);

                const targetPostComments = [...targetPost.comments];
                const targetCommentIndex = targetPostComments.findIndex(comment => comment.id === commentId);
                targetPostComments[targetCommentIndex] = newComment

                targetPost.comments = targetPostComments;
                newPosts[targetPostIndex] = targetPost;
                return axios.put(url,newPosts)
            })
            .then(response => {
                dispatch(editCommentSuccess(newPosts));
            })
            .catch(error => {
                dispatch(editCommentFail(error));
            })
    }
}

const editCommentSuccess = (posts) => {
    return {
        type: actionTypes.EDIT_COMMENT_SUCCESS,
        posts: posts
    }
}

const editCommentFail = (error) => {
    return {
        type: actionTypes.EDIT_COMMENT_FAIL,
        error: error
    }
}

const deleteCommentInit = () => {
    return {
        type: actionTypes.DELETE_COMMENT_INIT
    }
}

export const deleteCommentAttempt = (authToken, postsKey, postId, commentId) => {
    return dispatch => {
        dispatch(deleteCommentInit());
        const url = `/posts/${postsKey}.json?auth=${authToken}`
        let newPosts;
        axios.get(url)
            .then(response => {
                newPosts = [...response.data];
                const targetPostIndex = newPosts.findIndex(post => post.id === postId);
                const targetPost = newPosts.find(post => post.id === postId);

                const targetPostComments = [...targetPost.comments];
                const targetCommentIndex = targetPostComments.findIndex(comment => comment.id === commentId);
                targetPostComments.splice(targetCommentIndex, 1);

                targetPost.comments = targetPostComments;
                newPosts[targetPostIndex] = targetPost;
                return axios.put(url,newPosts)
            })
            .then(response => {
                dispatch(deleteCommentSuccess(newPosts));
            })
            .catch(error => {
                dispatch(deleteCommentFail(error));
            })
    }
}

const deleteCommentSuccess = (posts) => {
    return {
        type: actionTypes.DELETE_COMMENT_SUCCESS,
        posts: posts
    }
}

const deleteCommentFail = (error) => {
    return {
        type: actionTypes.DELETE_COMMENT_FAIL,
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
        dispatch(addReplyInit());
        KeyGenerator.getKey(authToken, (newKey) => {
            const url = `/posts/${postsKey}.json?auth=${authToken}`
            const newReply = {...reply, id: newKey}
            let newPosts;
            axios.get(url)
                .then(response => {
                    newPosts = [...response.data];
                    const targetPostIndex = newPosts.findIndex(post => post.id === postId);
                    const targetPost = newPosts.find(post => post.id === postId);

                    const targetPostComments = [...targetPost.comments];
                    const targetCommentIndex = targetPostComments.findIndex(comment => comment.id === commentId);
                    const targetComment = targetPostComments.find(comment => comment.id === commentId);

                    let targetCommentReplies;
                    if (targetComment.replies && targetComment.replies.length) {
                        targetCommentReplies = [...targetComment.replies, newReply];
                    } else {
                        targetCommentReplies = [newReply];
                    }

                    targetComment.replies = targetCommentReplies;
                    targetPostComments[targetCommentIndex] = targetComment;
                    targetPost.comments = targetPostComments;
                    newPosts[targetPostIndex] = targetPost;

                    return axios.put(url, newPosts)
                })
                .then(response => {
                    dispatch(addReplySuccess(newPosts));
                })
                .catch(error => {
                    dispatch(addReplyFail(error))
                })
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

const editReplyInit = () => {
    return {
        type: actionTypes.EDIT_REPLY_INIT
    }
}

export const editReplyAttempt = (authToken, postsKey, postId, commentId, replyId, payload) => {
    return dispatch => {
        dispatch(editReplyInit());
        const url = `/posts/${postsKey}.json?auth=${authToken}`
        const editedReply = {...payload}
        let newPosts;
        axios.get(url)
            .then(response => {
                newPosts = [...response.data];
                const targetPostIndex = newPosts.findIndex(post => post.id === postId);
                const targetPost = newPosts.find(post => post.id === postId);

                const targetPostComments = [...targetPost.comments];
                const targetCommentIndex = targetPostComments.findIndex(comment => comment.id === commentId);
                const targetComment = targetPostComments.find(comment => comment.id === commentId);

                const targetCommentReplies = [...targetComment.replies]
                const targetReplyIndex = targetCommentReplies.findIndex(reply => reply.id === replyId);
                targetCommentReplies[targetReplyIndex] = editedReply;

                targetComment.replies = targetCommentReplies;
                targetPostComments[targetCommentIndex] = targetComment;
                targetPost.comments = targetPostComments;
                newPosts[targetPostIndex] = targetPost;

                return axios.put(url, newPosts)
            })
            .then(response => {
                dispatch(editReplySuccess(newPosts));
            })
            .catch(error => {
                dispatch(editReplyFail(error))
            })

    }
}

const editReplySuccess = (posts) => {
    return {
        type: actionTypes.EDIT_REPLY_SUCCESS,
        posts: posts
    }
}

const editReplyFail = (error) => {
    return {
        type: actionTypes.EDIT_REPLY_FAIL,
        error: error
    }
}


const deleteReplyInit = () => {
    return {
        type: actionTypes.DELETE_REPLY_INIT
    }
}

export const deleteReplyAttempt = (authToken, postsKey, postId, commentId, replyId) => {
    return dispatch => {
        dispatch(deleteReplyInit());
        const url = `/posts/${postsKey}.json?auth=${authToken}`;
        let newPosts;
        axios.get(url)
            .then(response => {
                newPosts = [...response.data];
                const targetPostIndex = newPosts.findIndex(post => post.id === postId);
                const targetPost = newPosts.find(post => post.id === postId);

                const targetPostComments = [...targetPost.comments];
                const targetCommentIndex = targetPostComments.findIndex(comment => comment.id === commentId);
                const targetComment = targetPostComments.find(comment => comment.id === commentId);

                const targetCommentReplies = [...targetComment.replies];
                const targetReplyIndex = targetCommentReplies.findIndex(reply => reply.id === replyId);
                targetCommentReplies.splice(targetReplyIndex, 1);

                targetComment.replies = targetCommentReplies;
                targetPostComments[targetCommentIndex] = targetComment;
                targetPost.comments = targetPostComments;
                newPosts[targetPostIndex] = targetPost;

                return axios.put(url, newPosts)
            })
            .then(response => {
                dispatch(deleteReplySuccess(newPosts));
            })
            .catch(error => {
                dispatch(deleteReplyFail(error));
            })
    }
}

const deleteReplySuccess = (posts) => {
    return {
        type: actionTypes.DELETE_REPLY_SUCCESS,
        posts: posts
    }
}

const deleteReplyFail = (error) => {
    return {
        type: actionTypes.DELETE_REPLY_FAIL,
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
               dispatch(fetchSelfPostsSuccess(response.data))
            })
            .catch(error => {
               console.log('FETCH SELF POSTS: ERROR -> ', error)
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



