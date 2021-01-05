
import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";
import {KeyGenerator} from "../../shared/utility";
import {convertDatetime} from "../../shared/utility";


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
                    const firstEntry = {text: `Joined dumb facebook on ${today}`, date: today, id: -1}
                    const newLog = {userKey: userKey, publicProfileKey: publicProfileKey, activity: [firstEntry]}
                    return axios.post(`/activity.json`, newLog)
                })
                .then(response => {
                    activityLogKey = response.data.name;
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
                                        // dispatch(updateProfileSuccess(updatedUserProfile));
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


export const clearProfile = () => {
  return {
    type: actionTypes.CLEAR_PROFILE,
  };
};




