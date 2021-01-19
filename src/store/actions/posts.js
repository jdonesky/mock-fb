import * as actionTypes from "./actionTypes";
import axios from '../../axios/db-axios-instance';
import {KeyGenerator} from "../../shared/utility";

const addPostInit = () => {
    return {
        type: actionTypes.ADD_POST_INIT
    }
}


export const addPostAttempt = (authToken, postsKey, post, privacy) => {

    let loc
    if (!privacy) {
        loc = "public";
    } else {
        loc = privacy
    }

    return dispatch => {
        dispatch(addPostInit());
        axios.post(`/posts/${postsKey}/${loc}.json?auth=${authToken}`, post)
            .then(response => {
                const newPost =  {...post, id: response.data.name, privacy: loc}
                axios.put(`/posts/${postsKey}/${loc}/${response.data.name}.json?auth=${authToken}`, newPost)
                    .then(response => {
                        dispatch(addPostSuccess(newPost))
                    })
                    .catch(error => {
                        dispatch(addPostFail(error))
                    })
            })
            .catch(error => {
                dispatch(addPostFail(error))
            })
    }
}


const addPostSuccess = (newPost) => {
    return {
        type: actionTypes.ADD_POST_SUCCESS,
        post: newPost
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

const editPostSuccess = (posts, othersPosts) => {
    return {
        type: actionTypes.EDIT_POST_SUCCESS,
        posts: posts,
        othersPosts: othersPosts

    }
}

const editPostFail = (error) => {
    return {
        type: actionTypes.EDIT_POST_FAIL,
        error: error
    }
}

export const editPostAttempt = (authToken, postsKey, postId, payload, privacy, myPosts, othersPosts) => {
    let loc;
    if (!privacy) {
        loc = 'public'
    } else {
        loc = privacy
    }
    return dispatch => {
        dispatch(editPostInit());
        const url = `/posts/${postsKey}/${loc}/${postId}.json?auth=${authToken}`;
        const editedPost = {...payload, id: postId, privacy: loc};
        axios.put(url, editedPost)
            .then(response => {

                const postsIndex = myPosts ? myPosts.findIndex(post => post.id === editedPost.id) : null;
                const othersPostIndex = othersPosts ?  othersPosts.findIndex(post => post.id === editedPost.id) : null;

                let newPosts;
                if (postsIndex !== null && postsIndex !== -1) {
                    myPosts.splice(postsIndex, 1, editedPost)
                    newPosts = [...myPosts]
                }

                let newOthersPosts;
                if (othersPostIndex !== null && othersPostIndex !== -1) {
                    othersPosts.splice(othersPostIndex, 1, editedPost)
                    newOthersPosts = [...othersPosts]
                }

                dispatch(editPostSuccess(newPosts, newOthersPosts));
            })
            .catch(error => {
                dispatch(editPostFail(error))
            })
    }
}

const deletePostInit = () => {
    return {
        type: actionTypes.DELETE_POST_INIT,
    }
}

const deletePostSuccess = (posts, othersPosts) => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        posts: posts,
        othersPosts: othersPosts
    }
}

const deletePostFail = (error) => {
    return {
        type: actionTypes.DELETE_POST_FAIL,
        error: error
    }
}

export const deletePostAttempt = (authToken, postsKey, postId, privacy, myPosts, othersPosts) => {

    let loc;
    if (!privacy) {
        loc = 'public'
    } else {
        loc = privacy
    }
    return dispatch => {
        dispatch(deletePostInit());
        const url = `/posts/${postsKey}/${loc}/${postId}.json?auth=${authToken}`;
        console.log('url', url)
        axios.delete(url)
            .then(response => {
                const postsIndex = myPosts ? myPosts.findIndex(post => post.id === postId) : null;
                const othersPostIndex = othersPosts ?  othersPosts.findIndex(post => post.id === postId) : null;

                let newPosts;
                if (postsIndex !== null && postsIndex !== -1) {
                    myPosts.splice(postsIndex, 1)
                    newPosts = [...myPosts]
                }

                let newOthersPosts;
                if (othersPostIndex !== null && othersPostIndex !== -1) {
                    othersPosts.splice(othersPostIndex, 1)
                    newOthersPosts = [...othersPosts]
                }

                dispatch(deletePostSuccess(newPosts, newOthersPosts));
            })
            .catch(error => {
                dispatch(deletePostFail(error));
            })
    }
}

const addPostReactionInit = () => {
    return {
        type: actionTypes.ADD_POST_REACTION_INIT
    }
}

const addPostReactionSuccess = (posts, othersPosts) => {
    return {
        type: actionTypes.ADD_POST_REACTION_SUCCESS,
        posts: posts,
        othersPosts: othersPosts
    }
}

const addPostReactionFail = (error) => {
    return {
        type: actionTypes.ADD_POST_REACTION_FAIL,
        error: error
    }
}

export const addPostReactionAttempt = (authToken, postsKey, postId, reaction, privacy, myPosts, othersPosts) => {
    let loc;
    if (!privacy) {
        loc = 'public'
    } else {
        loc = privacy
    }
    let newReaction;
    return dispatch => {
        dispatch(addPostReactionInit())
        const url = `/posts/${postsKey}/${loc}/${postId}/reactions.json?auth=${authToken}`
        axios.post(url, reaction)
            .then(response => {
                const reactionKey = response.data.name
                newReaction = {...reaction, id: reactionKey}
                axios.put(`/posts/${postsKey}/${loc}/${postId}/reactions/${reactionKey}.json?auth=${authToken}`, newReaction)
            })
            .then(response => {
                let myNewPosts;
                if (myPosts) {
                    const thisPost = {...myPosts.find(post => post.id === postId)};
                    const thisPostIndex = myPosts.findIndex(post => post.id === postId);
                    let newReactions;
                    if (thisPost.reactions) {
                        newReactions = [...thisPost.reactions, newReaction]
                    } else {
                        newReactions = [newReaction]
                    }
                    thisPost.reactions = newReactions;
                    myPosts.splice(thisPostIndex, 1, thisPost)
                    myNewPosts = [...myPosts]
                }

                let othersNewPosts;
                if (othersPosts) {
                    const thisPost = {...othersPosts.find(post => post.id === postId)};
                    const thisPostIndex = othersPosts.findIndex(post => post.id === postId);
                    let newReactions;
                    if (thisPost.reactions) {
                        newReactions = [...thisPost.reactions, newReaction]
                    } else {
                        newReactions = [newReaction]
                    }
                    thisPost.reactions = newReactions;
                    othersPosts.splice(thisPostIndex, 1, thisPost)
                    othersNewPosts = [...othersPosts]
                }
                dispatch(addPostReactionSuccess(myNewPosts, othersNewPosts));
            })
            .catch(error => {
                dispatch(addPostReactionFail(error));
            })
    }
}


const addCommentInit = () => {
    return {
        type: actionTypes.ADD_COMMENT_INIT
    }
}

const addCommentSuccess = (posts, othersPosts) => {
    return {
        type: actionTypes.ADD_COMMENT_SUCCESS,
        posts: posts,
        othersPosts: othersPosts
    }
}

const addCommentFail = (error) => {
    return {
        type: actionTypes.ADD_COMMENT_FAIL,
        error: error
    }
}

export const addCommentAttempt = (authToken, postsKey, postId, comment, privacy, myPosts, othersPosts) => {

    let loc;
    if (!privacy) {
        loc = 'public'
    } else {
        loc = privacy
    }

    return dispatch => {
        dispatch(addCommentInit());
        let url = `/posts/${postsKey}/${loc}/${postId}/comments.json?auth=${authToken}`
        axios.post(url, comment)
            .then(response => {
                const commentKey = response.data.name;
                const newComment = {...comment, id: commentKey}
                url = `/posts/${postsKey}/${loc}/${postId}/comments/${commentKey}.json?auth=${authToken}`
                axios.put(url, newComment)
                    .then(response => {
                        let myNewPosts;
                        if (myPosts && myPosts.length) {
                            const thisPost = {...myPosts.find(post => post.id === postId)};
                            const thisPostIndex = myPosts.findIndex(post => post.id === postId);
                            let newComments;
                            if (thisPost.comments) {
                                newComments = {...thisPost.comments, [newComment.id]: {...newComment}}
                            } else {
                                newComments = {[newComment.id]: {...newComment}}
                            }
                            thisPost.comments = newComments;
                            myPosts.splice(thisPostIndex, 1, thisPost)
                            myNewPosts = [...myPosts]
                        }

                        let othersNewPosts;
                        if (othersPosts && othersPosts.length) {
                            const thisPost = {...othersPosts.find(post => post.id === postId)};
                            const thisPostIndex = othersPosts.findIndex(post => post.id === postId);

                            let newComments;
                            if (thisPost.comments) {
                                newComments = {...thisPost.comments, [newComment.id]: {...newComment}}
                            } else {
                                newComments = {[newComment.id]: {...newComment}}
                            }
                            thisPost.comments = newComments;
                            othersPosts.splice(thisPostIndex, 1, thisPost)
                            othersNewPosts = [...othersPosts]
                        }

                        dispatch(addCommentSuccess(myNewPosts, othersNewPosts))
                    })
                    .catch(error => {
                        dispatch(addCommentFail(error))
                    })
            })
            .catch(error => {
                dispatch(addCommentFail(error))
            })
    }
}

const editCommentInit = () => {
    return {
        type: actionTypes.EDIT_COMMENT_INIT
    }
}

const editCommentSuccess = (posts, othersPosts) => {
    return {
        type: actionTypes.EDIT_COMMENT_SUCCESS,
        posts: posts,
        othersPosts: othersPosts
    }
}

const editCommentFail = (error) => {
    return {
        type: actionTypes.EDIT_COMMENT_FAIL,
        error: error
    }
}

export const editCommentAttempt = (authToken, postsKey, postId, commentId, newComment, privacy, myPosts, othersPosts) => {


    let loc;
    if (!privacy) {
        loc = 'public'
    } else {
        loc = privacy
    }

    return dispatch => {
        dispatch(editCommentInit())
        const url = `/posts/${postsKey}/${loc}/${postId}/comments/${commentId}.json?auth=${authToken}`
        axios.put(url, newComment)
            .then(response => {

                let myNewPosts;
                if (myPosts && myPosts.length) {
                    const thisPost = {...myPosts.find(post => post.id === postId)};
                    const thisPostIndex = myPosts.findIndex(post => post.id === postId);
                    let newComments;
                    if (thisPost.comments) {
                        newComments = {...thisPost.comments, [newComment.id]: {...newComment}}
                    } else {
                        newComments = {[newComment.id]: {...newComment}}
                    }
                    thisPost.comments = newComments;
                    myPosts.splice(thisPostIndex, 1, thisPost)
                    myNewPosts = [...myPosts]
                }

                let othersNewPosts;
                if (othersPosts && othersPosts.length) {
                    const thisPost = {...othersPosts.find(post => post.id === postId)};
                    const thisPostIndex = othersPosts.findIndex(post => post.id === postId);

                    let newComments;
                    if (thisPost.comments) {
                        newComments = {...thisPost.comments, [newComment.id]: {...newComment}}
                    } else {
                        newComments = {[newComment.id]: {...newComment}}
                    }
                    thisPost.comments = newComments;
                    othersPosts.splice(thisPostIndex, 1, thisPost)
                    othersNewPosts = [...othersPosts]
                }

                dispatch(editCommentSuccess(myNewPosts, othersNewPosts));
            })
            .catch(error => {
                dispatch(editCommentFail(error));
            })
    }
}


const deleteCommentInit = () => {
    return {
        type: actionTypes.DELETE_COMMENT_INIT
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


export const deleteCommentAttempt = (authToken, postsKey, postId, commentId, privacy, myPosts, othersPosts) => {

    console.log('IN DELETE COMMENT ATTEMPT')
    console.log('privacy', privacy);
    console.log('myPosts', myPosts);
    console.log('othersPosts', othersPosts);

    let loc;
    if (!privacy) {
        loc = 'public'
    } else {
        loc = privacy
    }

    return dispatch => {
        dispatch(deleteCommentInit());
        const url = `/posts/${postsKey}/${loc}/${postId}/comments/${commentId}.json?auth=${authToken}`
        axios.delete(url)
            .then(response => {
                let myNewPosts;
                if (myPosts && myPosts.length) {
                    const thisPost = {...myPosts.find(post => post.id === postId)};
                    const thisPostIndex = myPosts.findIndex(post => post.id === postId);
                    let newComments;
                    if (thisPost.comments) {
                        delete thisPost.comments[commentId]
                        newComments = {...thisPost.comments}
                        console.log('myPosts - new comments -> ', newComments)
                    }
                    thisPost.comments = newComments;
                    myPosts.splice(thisPostIndex, 1, thisPost)
                    myNewPosts = [...myPosts]
                }

                let othersNewPosts;
                if (othersPosts && othersPosts.length) {
                    const thisPost = {...othersPosts.find(post => post.id === postId)};
                    const thisPostIndex = othersPosts.findIndex(post => post.id === postId);

                    let newComments;
                    if (thisPost.comments) {
                        console.log('othersPosts - comments before deleting -> ', thisPost.comments)
                        delete thisPost.comments[commentId]
                        newComments = {...thisPost.comments}
                        console.log('othersPosts - comments after deleting -> ', newComments)
                    }

                    thisPost.comments = newComments;
                    othersPosts.splice(thisPostIndex, 1, thisPost)
                    othersNewPosts = [...othersPosts]
                }

                dispatch(deleteCommentSuccess(myNewPosts, othersNewPosts));
            })
            .catch(error => {
                dispatch(deleteCommentFail(error));
            })
    }
}



const addReplyInit = () => {
    return {
        type: actionTypes.ADD_REPLY_INIT
    }
}

const addReplySuccess = (posts, othersPosts) => {
    return {
        type: actionTypes.ADD_REPLY_SUCCESS,
        posts: posts,
        othersPosts: othersPosts
    }
}

const addReplyFail = (error) => {
    return {
        type: actionTypes.ADD_REPLY_FAIL,
        error: error
    }
}

export const addReplyAttempt = (authToken, postsKey, postId, commentId, reply, privacy, myPosts, othersPosts) => {

    // console.log('IN ADD REPLY ATTEMPT')
    // console.log('postsKeys', postsKey)
    // console.log('postsId', postId)
    // console.log('commentId', commentId)
    // console.log('reply', reply)
    // console.log('privacy', privacy)
    // console.log('myPosts', myPosts)
    // console.log('myPosts', othersPosts)

    let loc;
    if (!privacy) {
        loc = 'public';
    } else {
        loc = privacy;
    }
    return dispatch => {
        dispatch(addReplyInit());
        let newReply;
        let url = `/posts/${postsKey}/${loc}/${postId}/comments/${commentId}/replies.json?auth=${authToken}`
        axios.post(url, reply)
            .then(response => {
               const replyKey = response.data.name;
               newReply = {...reply, id: replyKey};
               url = `/posts/${postsKey}/${loc}/${postId}/comments/${commentId}/replies/${replyKey}.json?auth=${authToken}`
               return axios.put(url, newReply)
            })
            .then(response => {
                let myNewPosts;
                if (myPosts && myPosts.length) {
                    console.log('myPosts BEFORE -> ', myPosts)
                    const thisPost = {...myPosts.find(post => post.id === postId)};
                    const thisPostIndex = myPosts.findIndex(post => post.id === postId);
                    console.log('this POST -> ', thisPost);
                    let newComments;
                    if (thisPost.comments) {
                        console.log('thisPost.comments -> ', thisPost.comments)
                        const thisComment = {...thisPost.comments[commentId]}
                        console.log('this COMMENT', thisComment)
                        let newReplies;
                        if (thisComment.replies) {
                            console.log('thisComment.replies -> ', thisComment.replies)
                            newReplies = {...thisComment.replies, [newReply.id]: {...newReply}}
                        } else {
                            console.log('no existing replies sooo newReplies -> ', {[newReply.id]: {...newReply}})
                            newReplies = {[newReply.id]: {...newReply}}
                        }
                        thisComment.replies = newReplies;
                        console.log('thisComment REPLIES (after adding)', newReplies)
                        thisPost.comments[commentId] = thisComment;
                        newComments = {...thisPost.comments}
                        thisPost.comments = newComments;
                        console.log('replace thisPost.comments <- (newComments) ->', newComments)
                        console.log('thisPost.COMMENTS after putting new reply in comment and comment back in thisPost', thisPost.comments)
                        myPosts.splice(thisPostIndex, 1, thisPost);
                        myNewPosts = [...myPosts];
                        console.log('myNewPosts AFTER ADDING ', myNewPosts)
                    }
                }

                let othersNewPosts;
                if (othersPosts && othersPosts.length) {
                    console.log('othersPosts BEFORE -> ', othersPosts)
                    const thisPost = {...othersPosts.find(post => post.id === postId)};
                    const thisPostIndex = othersPosts.findIndex(post => post.id === postId);
                    let newComments;
                    if (thisPost.comments) {
                        const thisComment = {...thisPost.comments[commentId]}
                        let newReplies;
                        if (thisComment.replies) {
                            newReplies = {...thisComment.replies, [newReply.id]: {...newReply}}
                        } else {
                            newReplies = {[newReply.id]: {...newReply}}
                        }
                        thisComment.replies = newReplies;
                        thisPost.comments[commentId] = thisComment;
                        newComments = {...thisPost.comments}
                        thisPost.comments = newComments;
                        othersPosts.splice(thisPostIndex, 1, thisPost);
                        othersNewPosts = [...othersPosts];
                    }
                }

                console.log('myNewPosts AFTER adding reply -> ', myNewPosts);
                console.log('othersNewPosts AFTER adding reply -> ', othersNewPosts);

                dispatch(addReplySuccess(myNewPosts, othersNewPosts));
            })
            .catch(error => {
                dispatch(addReplyFail(error))
            })
    }
}

// export const addReplyAttempt = (authToken, postsKey, postId, commentId, reply, privacy, myPosts, othersPosts) => {
//     return dispatch => {
//         dispatch(addReplyInit());
//         KeyGenerator.getKey(authToken, (newKey) => {
//             const url = `/posts/${postsKey}.json?auth=${authToken}`
//             const newReply = {...reply, id: newKey}
//             let newPosts;
//             axios.get(url)
//                 .then(response => {
//                     newPosts = [...response.data];
//                     const targetPostIndex = newPosts.findIndex(post => post.id === postId);
//                     const targetPost = newPosts.find(post => post.id === postId);
//
//                     const targetPostComments = [...targetPost.comments];
//                     const targetCommentIndex = targetPostComments.findIndex(comment => comment.id === commentId);
//                     const targetComment = targetPostComments.find(comment => comment.id === commentId);
//
//                     let targetCommentReplies;
//                     if (targetComment.replies && targetComment.replies.length) {
//                         targetCommentReplies = [...targetComment.replies, newReply];
//                     } else {
//                         targetCommentReplies = [newReply];
//                     }
//
//                     targetComment.replies = targetCommentReplies;
//                     targetPostComments[targetCommentIndex] = targetComment;
//                     targetPost.comments = targetPostComments;
//                     newPosts[targetPostIndex] = targetPost;
//
//                     return axios.put(url, newPosts)
//                 })
//                 .then(response => {
//                     dispatch(addReplySuccess(newPosts));
//                 })
//                 .catch(error => {
//                     dispatch(addReplyFail(error))
//                 })
//         })
//     }
// }

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
    let posts = [];
    return dispatch => {
        dispatch(fetchSelfPostsInit())
        axios.get(`/posts/${postsKey}/public.json?auth=${authToken}`)
            .then(response => {
                if (response.data) {
                    posts = [...posts,...Object.keys(response.data).map(key => response.data[key])]
                }
                return axios.get(`/posts/${postsKey}/private.json?auth=${authToken}`)
            })
            .then(response => {
                if (response.data) {
                    posts = [...posts,...Object.keys(response.data).map(key => response.data[key])]
                }
                return axios.get(`/posts/${postsKey}/friends.json?auth=${authToken}`)
            })
            .then(response => {
                if (response.data) {
                    posts = [...posts,...Object.keys(response.data).map(key => response.data[key])]
                }
                dispatch(fetchSelfPostsSuccess([...posts]))
            })
            .catch(error => {
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


const fetchOthersPostsInit = () => {
    return {
        type: actionTypes.FETCH_OTHERS_POSTS_INIT
    }
}


export const fetchOthersPostsAttempt = (authToken, lastFetchedPage, oldPosts) => {
    return dispatch => {
        if (lastFetchedPage === 'last') {
            dispatch(markScrollEnd())
        }
        dispatch(fetchOthersPostsInit())
        axios.get(`/posts.json?auth=${authToken}&shallow=true`)
            .then(response => {
                const keys = Object.keys(response.data).sort();
                const pageLength = 2;

                if (!lastFetchedPage) {
                    lastFetchedPage = 0;
                }

                const promises = [];
                let query;

                for (let key of keys.slice(lastFetchedPage, lastFetchedPage + pageLength)) {
                    query = axios.get(`/posts/${key}/public.json?auth=${authToken}&orderBy="id"&startAt=1&limitToLast=3`)
                    promises.push(query);
                }

                if (lastFetchedPage + pageLength <= keys.length) {
                    lastFetchedPage = lastFetchedPage + pageLength;
                } else {
                    const remainder = keys.length - lastFetchedPage;
                    if (remainder) {
                        lastFetchedPage += remainder;
                    } else {
                        lastFetchedPage = 'last';
                    }
                }

                return Promise.all(promises)
            })
            .then(responses => {
                const oldPostIds = oldPosts && oldPosts.length ? oldPosts.map(post => post.id) : null;
                let newPosts = responses.map(response => {
                    if (response.data && Object.keys(response.data).length) {
                        return [...Object.keys(response.data).map(key => response.data[key])]
                    }}
                )
                    .flat().filter(item => item)
                    .sort((a,b) => {
                        return new Date(b.date) - new Date(a.date);
                    });
                if (oldPostIds) {
                    newPosts = newPosts.filter(post => !oldPostIds.includes(post.id))
                    newPosts = oldPosts.concat(newPosts);
                }

                dispatch(fetchOthersPostsSuccess(newPosts,lastFetchedPage))
            })
            .catch(error => {
                dispatch(fetchOthersPostsFail(error));
            })
    }
}

// export const fetchOthersPostsAttempt = (authToken, lastFetchedPage, oldPosts) => {
//     return dispatch => {
//         if (lastFetchedPage === 'last') {
//             dispatch(markScrollEnd())
//         }
//         dispatch(fetchOthersPostsInit())
//         axios.get(`/posts.json?auth=${authToken}&shallow=true`)
//             .then(response => {
//                 const keys = Object.keys(response.data).sort();
//                 const pageLength = 2;
//
//                 if (!lastFetchedPage) {
//                     lastFetchedPage = 0;
//                 }
//
//                 const promises = [];
//                 let query;
//
//                 for (let key of keys.slice(lastFetchedPage, lastFetchedPage + pageLength)) {
//                     query = axios.get(`/posts/${key}.json?auth=${authToken}&orderBy="id"&startAt=0&limitToLast=2`)
//                     promises.push(query);
//                 }
//
//                 if (lastFetchedPage + pageLength <= keys.length) {
//                     lastFetchedPage = lastFetchedPage + pageLength;
//                 } else {
//                     const remainder = keys.length - lastFetchedPage;
//                     if (remainder) {
//                         lastFetchedPage += remainder;
//                     } else {
//                         lastFetchedPage = 'last';
//                     }
//                 }
//
//                 return Promise.all(promises)
//             })
//             .then(responses => {
//                 const oldPostIds = oldPosts && oldPosts.length ? oldPosts.map(post => post.id) : null;
//
//                 let newPosts = responses.map(response => {
//                     if (response.data && response.data.length) {
//                         return [...response.data]
//                     }}
//                 )
//                     .flat().filter(item => item)
//                     .sort((a,b) => {
//                         return new Date(b.date) - new Date(a.date);
//                     });
//                 if (oldPostIds) {
//                     newPosts = newPosts.filter(post => !oldPostIds.includes(post.id))
//                     newPosts = oldPosts.concat(newPosts);
//                 }
//
//                 dispatch(fetchOthersPostsSuccess(newPosts,lastFetchedPage))
//             })
//             .catch(error => {
//                 dispatch(fetchOthersPostsFail(error));
//             })
//     }
// }

const fetchOthersPostsSuccess = (posts, lastFetchedPage) => {
    return {
        type: actionTypes.FETCH_OTHERS_POSTS_SUCCESS,
        posts: posts,
        lastFetchedPage: lastFetchedPage
    }
}

export const markScrollEnd = () => {
    return {
        type: actionTypes.MARK_SCROLL_END
    }
}

export const clearScrollEnd = () => {
    return {
        type: actionTypes.CLEAR_SCROLL_END
    }
}

export const clearOthersPostsPageCount = () => {
    return {
        type: actionTypes.CLEAR_OTHERS_POSTS_PAGE_COUNT
    }
}

const fetchOthersPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_OTHERS_POSTS_FAIL,
        error: error,
    }
}


export const logoutClearPosts = () => {
    return {
        type: actionTypes.LOGOUT_CLEAR_POSTS
    }
}