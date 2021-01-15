
import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";
import {KeyGenerator} from "../../shared/utility";
import {convertDatetime} from "../../shared/utility";


const saveNotificationTokenInit = () => {
    return {
        type: actionTypes.SAVE_NOTIFICATION_TOKEN_INIT
    }
}

const saveNotificationTokenSuccess = (token) => {
    return {
        type: actionTypes.SAVE_NOTIFICATION_TOKEN_SUCCESS,
        token: token
    }
}

const saveNotificationTokenFail = (error) => {
    return {
        type: actionTypes.SAVE_NOTIFICATION_TOKEN_FAIL,
        error: error
    }
}

export const saveNotificationTokenAttempt = (authToken, userKey, token) => {
    return dispatch => {
        dispatch(saveNotificationTokenInit())
        axios.patch(`/users/${userKey}/notificationToken.json?auth=${authToken}`, {[token]: token})
            .then(response => {
                // console.log('success - saved notification token')
                dispatch(saveNotificationTokenSuccess(token))
            })
            .catch(error => {
                console.log('failed to save notification token', error )
                dispatch(saveNotificationTokenFail(error))
            })
    }
}

const loadProfileInit = () => {
    return {
        type: actionTypes.LOAD_PROFILE_INIT
    }
}

const updateProfileInit = () => {
  return {
    type: actionTypes.UPDATE_PROFILE_INIT,
  };
};

export const createProfileAttempt =  (token,newUserData) => {
    return dispatch => {
        dispatch(loadProfileInit());
        let userData;
        let postsKey;
        let userKey;
        let publicProfileKey;
        let activityLogKey;
        let postsWithKeys;
        KeyGenerator.getKey(token, (newKey) => {
            const today = new Date();
            let yesterday = new Date();
            yesterday = new Date(yesterday.setDate(today.getDate() - 1));
            const basePost = {name: newUserData.firstName + ' ' + newUserData.lastName, text: 'hold postsKey', date: yesterday, id: -1}
            axios.post(`/posts.json?auth=${token}`,[basePost, {name: newUserData.firstName + ' ' + newUserData.lastName,text: `${newUserData.firstName} ${newUserData.lastName} joined ${convertDatetime(today, true)}`, date: today, id: newKey}])
                .then(response => {
                    postsKey = response.data.name;
                    return axios.get(`/posts/${postsKey}.json?auth=${token}`)
                })
                .then(response => {
                    postsWithKeys = response.data.map(post => ({...post, postsKey: postsKey}))
                    return axios.put(`/posts/${postsKey}.json?auth=${token}`, [...postsWithKeys]);
                })
                .then(response => {
                    userData = {postsKey: postsKey, ...newUserData}
                    return axios.post(`/users.json?auth=${token}`, userData)
                })
                .then(response => {
                    userKey = response.data.name
                    userData = {userKey: userKey,...userData};
                    postsWithKeys = postsWithKeys.map(post => ({...post, userKey: userKey}))
                    return axios.put(`/posts/${postsKey}.json?auth=${token}`, [...postsWithKeys])
                })
                .then( response => {
                    return axios.post(`/public-profiles.json?auth=${token}`, {...userData, privacy: {AllowMessages: 'FRIENDS'}})
                })
                .then(response => {
                    publicProfileKey = response.data.name;
                    userData = {publicProfileKey: publicProfileKey,...userData}
                    return axios.put(`users/${userKey}.json?auth=${token}`, userData)
                })
                .then(response => {
                    const newLog = {userKey: userKey, publicProfileKey: publicProfileKey}
                    return axios.post(`/activity.json?auth=${token}`, newLog)
                })
                .then(response => {
                    activityLogKey = response.data.name;
                    const firstEntry = {text: `You joined dumb facebook`, date: today, sortDate: today.getTime(), read: "false", type: "INFO", subject: "SELF"}
                    return axios.post(`/activity/${activityLogKey}/records.json?auth=${token}`, firstEntry)
                })
                .then(response => {
                    userData = {...userData, activityLogKey: activityLogKey}
                    console.log(userData);
                    return axios.put(`/public-profiles/${publicProfileKey}.json?auth=${token}`, {...userData, publicProfileKey: publicProfileKey, privacy: {AllowMessages: 'FRIENDS'}, activityLogKey: activityLogKey})
                })
                .then(response => {
                    postsWithKeys = postsWithKeys.map(post => ({...post, publicProfileKey: publicProfileKey}))
                    return axios.put(`/posts/${postsKey}.json?auth=${token}`, [...postsWithKeys])
                })
                .then(response => {
                    return axios.put(`users/${userKey}.json?auth=${token}`, userData)
                })
                .then(response => {
                    return axios.put(`/follows/${userData.userId}.json?auth=${token}`, {name: userData.firstName + ' ' + userData.lastName, userKey: userKey, publicProfileKey: publicProfileKey, isOnline: true})
                })
                .then(response => {
                    console.log('success - patched follows')
                    dispatch(createProfileSuccess(userData));
                })
                .catch(error => {
                    console.log(error.message);
                    dispatch(updateProfileFail(error))
                })
        })
    }
}

const createProfileSuccess = (userData) => {
  return {
    type: actionTypes.CREATE_PROFILE_SUCCESS,
    userData: userData
  }
}

export const fetchProfileAttempt = (userId, token) => {
  return (dispatch) => {
    dispatch(loadProfileInit());
    const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/users.json" + queryParams)
      .then((response) => {
        const userData = Object.keys(response.data).map((key) => {
          return { key: key, ...response.data[key] };
        })[0]
        dispatch(fetchProfileSuccess(userData));
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateProfileFail(err));
      });
  };
};

const fetchProfileSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    userData: userData,
  };
};

export const updateProfileAttempt = (authToken, firebaseKey, fieldName, payload, how, id) => {
    return dispatch => {
        dispatch(updateProfileInit());
        let updatedUserProfile;
        let updatedPublicProfile;
        let publicProfileKey;
        let postsKey;
        let updatePostsProfilePics;
        const url = `/users/${firebaseKey}.json?auth=${authToken}`
        axios.get(url)
            .then(response => {
                publicProfileKey = response.data.publicProfileKey;
                postsKey = response.data.postsKey;
                KeyGenerator.getKey(authToken, (newKey) => {
                    switch (how) {
                        case "edit":
                            if (fieldName === 'occupations' || fieldName === 'education' || fieldName === 'relationships' || fieldName === 'family' || fieldName === 'pastLocations' || fieldName === 'posts') {
                                if (response.data[fieldName]) {
                                    const updatedArray = [...response.data[fieldName]];
                                    const itemIndex = updatedArray.findIndex(item => item.id === id);
                                    updatedArray[itemIndex] = {...payload, id: newKey};
                                    updatedUserProfile = {...response.data, [fieldName]: updatedArray};
                                } else {
                                    if (typeof (payload) === 'object') {
                                        updatedUserProfile = {
                                            ...response.data,
                                            [fieldName]: [{...payload, id: newKey}]
                                        }
                                    } else {
                                        updatedUserProfile = {
                                            ...response.data,
                                            [fieldName]: [{payload, id: newKey}]
                                        }
                                    }
                                }
                            } else if (fieldName === 'email' || fieldName === 'phone') {
                                const updatedContacts = {...response.data['contacts'], [fieldName]: payload}
                                updatedUserProfile = {...response.data, contacts: updatedContacts}
                            } else if (fieldName === 'profileImage' || fieldName === 'coverImage' ) {
                                updatePostsProfilePics = true;
                                updatedUserProfile = {...response.data, [fieldName]: payload};
                            } else {
                                updatedUserProfile = {...response.data, [fieldName]: payload};
                            }
                            break;
                        case "add":
                            if (fieldName === 'occupations' || fieldName === 'education' || fieldName === 'relationships' || fieldName === 'family' || fieldName === 'pastLocations' || fieldName === 'lifeEvents' || fieldName === 'posts') {
                                if (response.data[fieldName]) {
                                    updatedUserProfile = {
                                        ...response.data,
                                        [fieldName]: [...response.data[fieldName], {...payload, id: newKey}]
                                    }
                                } else {
                                    updatedUserProfile = {
                                        ...response.data,
                                        [fieldName]: [{...payload, id: newKey}]
                                    }
                                }
                            } else if (fieldName === 'email' || fieldName === 'phone') {
                                const updatedContacts = {...response.data['contacts'], [fieldName]: payload}
                                updatedUserProfile = {...response.data, contacts: updatedContacts}
                            } else {
                                updatedUserProfile = {...response.data, [fieldName]: payload};
                            }
                            break;
                        case "delete":
                            if (fieldName === 'occupations' || fieldName === 'education' || fieldName === 'relationships' || fieldName === 'family' || fieldName === 'pastLocations') {
                                if (!response.data[fieldName]) {
                                    return;
                                } else {
                                    const updatedArray = [...response.data[fieldName]];
                                    const deleteIndex = updatedArray.findIndex(item => item.id === id);
                                    updatedArray.splice(deleteIndex, 1);
                                    updatedUserProfile = {...response.data, [fieldName]: updatedArray}
                                }
                            } else if (fieldName === 'email' || fieldName === 'phone') {
                                const updatedContacts = {...response.data['contacts'], [fieldName] : null}
                                updatedUserProfile = {...response.data, contacts: updatedContacts}
                            } else {
                                console.log('deleting single entry field')
                                updatedUserProfile = {...response.data, [fieldName]: null}
                            }
                            break;
                        default:
                            throw new Error("Shouldn't be here!")
                    }
                    axios.put(url, updatedUserProfile)
                        .then(response => {
                            return axios.get(`/public-profiles/${publicProfileKey}.json?auth=${authToken}`)
                        })
                        .then(response => {
                            switch (how) {
                                case "edit":
                                    if (fieldName === 'occupations' || fieldName === 'education' || fieldName === 'relationships' || fieldName === 'family' || fieldName === 'pastLocations' || fieldName === 'posts') {
                                        if (response.data[fieldName]) {
                                            const updatedArray = [...response.data[fieldName]];
                                            const itemIndex = updatedArray.findIndex(item => item.id === id);
                                            updatedArray[itemIndex] = {...payload, id: newKey};
                                            updatedPublicProfile = {...response.data, [fieldName]: updatedArray};
                                        } else {
                                            if (typeof (payload) === 'object') {
                                                updatedPublicProfile = {
                                                    ...response.data,
                                                    [fieldName]: [{...payload, id: newKey}]
                                                }
                                            } else {
                                                updatedPublicProfile = {
                                                    ...response.data,
                                                    [fieldName]: [{payload, id: newKey}]
                                                }
                                            }
                                        }
                                    } else if (fieldName === 'email' || fieldName === 'phone') {
                                        const updatedContacts = {...response.data['contacts'], [fieldName]: payload}
                                        updatedPublicProfile = {...response.data, contacts: updatedContacts}
                                    } else {
                                        updatedPublicProfile = {...response.data, [fieldName]: payload};
                                    }
                                    break;
                                case "add":
                                    if (fieldName === 'occupations' || fieldName === 'education' || fieldName === 'relationships' || fieldName === 'family' || fieldName === 'pastLocations' || fieldName === 'lifeEvents' || fieldName === 'posts') {
                                        if (response.data[fieldName]) {
                                            updatedPublicProfile = {
                                                ...response.data,
                                                [fieldName]: [...response.data[fieldName], {...payload, id: newKey}]
                                            }
                                        } else {
                                            updatedPublicProfile = {
                                                ...response.data,
                                                [fieldName]: [{...payload, id: newKey}]
                                            }
                                        }
                                    } else if (fieldName === 'email' || fieldName === 'phone') {
                                        const updatedContacts = {...response.data['contacts'], [fieldName]: payload}
                                        updatedPublicProfile = {...response.data, contacts: updatedContacts}
                                    } else {
                                        updatedPublicProfile = {...response.data, [fieldName]: payload};
                                    }
                                    break;
                                case "delete":
                                    if (fieldName === 'occupations' || fieldName === 'education' || fieldName === 'relationships' || fieldName === 'family' || fieldName === 'pastLocations') {
                                        if (!response.data[fieldName]) {
                                            return;
                                        } else {
                                            const updatedArray = [...response.data[fieldName]];
                                            const deleteIndex = updatedArray.findIndex(item => item.id === id);
                                            updatedArray.splice(deleteIndex, 1);
                                            updatedPublicProfile = {...response.data, [fieldName]: updatedArray}
                                        }
                                    } else if (fieldName === 'email' || fieldName === 'phone') {
                                        const updatedContacts = {...response.data['contacts'], [fieldName] : null}
                                        updatedPublicProfile = {...response.data, contacts: updatedContacts}
                                    } else {
                                        updatedPublicProfile = {...response.data, [fieldName]: null}
                                    }
                                    break;
                                default:
                                    throw new Error("Shouldn't be here!")
                            }
                            return axios.put(`/public-profiles/${publicProfileKey}.json?auth=${authToken}`, updatedPublicProfile)
                        })
                        .then(response => {
                            dispatch(updateProfileSuccess(updatedUserProfile));
                            if (updatePostsProfilePics) {
                                axios.get(`/posts/${postsKey}.json?auth=${authToken}`)
                                    .then(response => {
                                        console.log('GET POSTS SUCCESS - ', response.data);
                                        const updatedPosts = response.data.map(post => ({...post, [fieldName]: payload}))
                                        return axios.put(`/posts/${postsKey}.json?auth=${authToken}`, updatedPosts)
                                    })
                                    .then(response => {
                                        dispatch(updateProfileSuccess(updatedUserProfile));
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            }
                        })
                        .catch(err => console.log(err))
                })
            })
            .catch(error => {
                console.log(error)
                dispatch(updateProfileFail(error));
            })
    }
}

const updateProfileSuccess = (userData) => {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    userData: userData,
  };
};


const updateProfileFail = (error) => {
  return {
    type: actionTypes.UPDATE_PROFILE_FAIL,
    error: error,
  };
};

const fetchMyPublicProfileInit = () => {
    return {
        type: actionTypes.FETCH_MY_PUBLIC_PROFILE_INIT
    }
}

const fetchMyPublicProfileSuccess = (profile) => {
    return {
        type: actionTypes.FETCH_MY_PUBLIC_PROFILE_SUCCESS,
        profile: profile
    }
}

const fetchMyPublicProfileFail = (error) => {
    return {
        type: actionTypes.FETCH_MY_PUBLIC_PROFILE_FAIL,
        error: error
    }
}

export const fetchMyPublicProfileAttempt = (authToken, publicProfileKey) => {
    return dispatch => {
        dispatch(fetchMyPublicProfileInit());
        axios.get(`/public-profiles/${publicProfileKey}.json?auth=${authToken}`)
            .then(response => {
                dispatch(fetchMyPublicProfileSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchMyPublicProfileFail(error))
            })
    }
}

export const likePageSuccessFeedback = (newPublicProfile) => {
    return {
        type: actionTypes.LIKE_PAGE_SUCCESS_FEEDBACK,
        publicProfile: newPublicProfile
    }
}


const startNewChatInit = () => {
    return {
        type: actionTypes.START_NEW_CHAT_INIT
    }
}

const startNewChatSuccess = (chat, publicProfile) => {
    return {
        type: actionTypes.START_NEW_CHAT_SUCCESS,
        chat: chat,
        publicProfile: publicProfile
    }
}

const startNewChatFail = (error) => {
    return {
        type: actionTypes.START_NEW_CHAT_FAIL,
        error: error
    }
}


export const startNewChatAttempt = (authToken, myProfile, theirProfile, chat, theirType, myType) => {

    console.log('STARTING NEW CHAT ATTEMPT')
    console.log('myProfile', myProfile);
    console.log('theirProfile', theirProfile);
    console.log('chat', chat)
    console.log('theirType', theirType);
    console.log('myType', myType);

    return dispatch => {
        let newChat
        let chatKey;
        let myNewProfile;
        let theirNewProfile;
        let activeChatPath;
        let myKey;

        if (myType === 'PAGE') {
            myKey = myProfile.dbKey
        } else {
            myKey = myProfile.userKey
        }

        let theirKey;
        if (theirType === 'PAGE') {
            theirKey = theirProfile.dbKey
        } else if (theirType === 'USER') {
            theirKey = theirProfile.userKey
        }
        console.log('MY KEY', myKey)
        console.log('THEIR KEY', theirKey);

        dispatch(startNewChatInit())
        axios.post(`/chats.json?auth=${authToken}`, chat)
            .then(response => {
                console.log('post returned chatKey', response.data.name)
                chatKey = response.data.name;
                newChat = {...chat, key: chatKey}
                myNewProfile = {
                    ...myProfile,
                    chats : myProfile.chats ?
                        {...myProfile.chats, [theirKey]: chatKey}
                        : {[theirKey] : chatKey}}

                theirNewProfile = {
                    ...theirProfile,
                    chats: theirProfile.chats ?
                        {...theirProfile.chats, [myKey] : chatKey}
                        : {[myKey] : chatKey} }


                console.log('myNewProfile', myNewProfile);
                console.log('theirNewProfile', theirNewProfile);

                let theirProfilePath;
                if (theirType === 'PAGE') {
                    theirProfilePath = `/pages/${theirKey}.json?auth=${authToken}`;
                } else {
                    theirProfilePath = `/public-profiles/${theirNewProfile.publicProfileKey}.json?auth=${authToken}`;
                }
                return axios.put(theirProfilePath, theirNewProfile)
            })
            .then(response => {
                let myProfilePath;
                if (myType === 'PAGE') {
                    myProfilePath = `/pages/${myKey}.json?auth=${authToken}`
                    activeChatPath = `/pages/${myKey}/activeChat.json?auth=${authToken}`
                } else {
                    myProfilePath = `/public-profiles/${myNewProfile.publicProfileKey}.json?auth=${authToken}`
                    activeChatPath = `/users/${myNewProfile.userKey}/activeChat.json?auth=${authToken}`
                }
                return axios.put(myProfilePath, myNewProfile)
            })
            .then(response => {
                console.log('patching activeChat -> ', {...newChat, key: chatKey})
                console.log('...to my profile');
                console.log('with chatKey -> ', chatKey)
                return axios.patch(activeChatPath, {...newChat, key: chatKey})
            })
            .then(response => {
                dispatch(startNewChatSuccess({...newChat, key: chatKey}, myNewProfile))
            })
            .catch(error => {
                dispatch(startNewChatFail(error))
            })

            .catch(error => {
                dispatch(startNewChatFail(error))
            })

    }
}

const restartOldChatInit = () => {
    return {
        type: actionTypes.RESTART_OLD_CHAT_INIT
    }
}

const restartOldChatSuccess = (chat) => {
    return {
        type: actionTypes.RESTART_OLD_CHAT_SUCCESS,
        chat: chat
    }
}

const restartOldChatFail = (error) => {
    return {
        type: actionTypes.RESTART_OLD_CHAT_FAIL,
        error: error
    }
}

export const restartOldChatAttempt = (authToken, userKey, chatKey) => {
    return dispatch => {
        dispatch(restartOldChatInit());
        axios.get(`/chats/${chatKey}.json?auth=${authToken}`)
            .then(response => {
                return axios.put(`/users/${userKey}/activeChat.json?auth=${authToken}`, {...response.data, key: chatKey})
            })
            .then(response => {
                console.log('success - put old chat in profile activeChat', response.data)
                dispatch(restartOldChatSuccess({...response.data, key: chatKey}));
            })
            .catch(error => {
                console.log(error);
                dispatch(restartOldChatFail(error));
            })
    }
}


const fetchActiveChatInit = () => {
    return {
        type: actionTypes.FETCH_ACTIVE_CHAT_INIT
    }
}

const fetchActiveChatSuccess = (chat) => {
    return {
        type: actionTypes.FETCH_ACTIVE_CHAT_SUCCESS,
        chat: chat
    }
}

const fetchActiveChatFail = (error) => {
    return {
        type: actionTypes.FETCH_ACTIVE_CHAT_FAIL,
        error: error
    }
}

export const fetchActiveChatAttempt = (authToken, userKey) => {
    return dispatch => {
        dispatch(fetchActiveChatInit())
        axios.get(`/users/${userKey}/activeChat.json?auth=${authToken}`)
            .then(response => {
                // console.log('fetched activeChat', response.data);
                dispatch(fetchActiveChatSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchActiveChatFail(error));
            })
    }
}

const clearActiveChatInit = () => {
    return {
        type: actionTypes.CLEAR_ACTIVE_CHAT_INIT
    }
}

const clearActiveChatSuccess = () => {
    return {
        type: actionTypes.CLEAR_ACTIVE_CHAT_SUCCESS,
    }
}

const clearActiveChatFail = (error) => {
    return {
        type: actionTypes.CLEAR_ACTIVE_CHAT_FAIL,
        error: error
    }
}

export const clearActiveChatAttempt = (authToken, userKey) => {
    console.log('delete userKey/activeChat', userKey)
    return dispatch => {
        dispatch(clearActiveChatInit())
        axios.put(`/users/${userKey}/activeChat.json?auth=${authToken}`, {null: null})
            .then(response => {
                console.log(response.data);
                console.log('success - deleted activeChat from profile');
                dispatch(clearActiveChatSuccess())
            })
            .catch(error => {
                dispatch(clearActiveChatFail(error))
            })
    }
}

const removeFromNewMessagesInit = () => {
    return {
        type: actionTypes.REMOVE_FROM_NEW_MESSAGES_INIT
    }
}

const removeFromNewMessagesSuccess = (key) => {
    return {
        type: actionTypes.REMOVE_FROM_NEW_MESSAGES_SUCCESS,
        key: key
    }
}

const removeFromNewMessagesFail = (error) => {
    return {
        type: actionTypes.REMOVE_FROM_NEW_MESSAGES_FAIL,
        error: error
    }
}

export const removeFromNewMessagesAttempt = (authToken, pathRoot, myKey, theirKey) => {
    return dispatch => {
        dispatch(removeFromNewMessagesInit)
        axios.delete(`/${pathRoot}/${myKey}/newMessages/${theirKey}.json?auth=${authToken}`)
            .then(response => {
                console.log('SUCCESS - DELETED NEW MESSAGE');
                console.log('theirKey -> ', theirKey)
                dispatch(removeFromNewMessagesSuccess(theirKey))
            })
            .catch(error => {
                console.log('FAIL - ', error)
                dispatch(removeFromNewMessagesFail(error))
            })
    }
}


export const logoutClearProfile = () => {
  return {
    type: actionTypes.LOGOUT_CLEAR_PROFILE,
  };
};


export const clearLocalActiveChat = () => {
    return {
        type: actionTypes.CLEAR_LOCAL_ACTIVE_CHAT
    }
}



