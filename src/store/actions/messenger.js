
import * as actionTypes from './actionTypes';
import axios from '../../axios/db-axios-instance';
import {KeyGenerator} from "../../shared/utility";

const startNewChatInit = () => {
    return {
        type: actionTypes.START_NEW_CHAT_INIT
    }
}

const startNewChatSuccess = (chat) => {
    return {
        type: actionTypes.START_NEW_CHAT_SUCCESS,
        chat: chat
    }
}

const startNewChatFail = (error) => {
    return {
        type: actionTypes.START_NEW_CHAT_FAIL,
        error: error
    }
}


export const startNewChatAttempt = (authToken, myProfile, theirProfile, type) => {
    return dispatch => {
        let chatKey;
        let myNewProfile;
        let theirNewProfile;
        let theirKey;
        let theirName;
        if (type === 'PAGE') {
            theirKey = theirProfile.dbKey;
            theirName = theirProfile.name;
        } else {
            theirKey = theirProfile.userKey;
            theirName = theirProfile.firstName + ' ' + theirProfile.lastName;
        }
        const newChat = {
            parties: [
                {name: myProfile.firstName + ' ' + myProfile.lastName, profileImage: myProfile.profileImage, userKey:myProfile.userKey},
                {name: theirName, profileImage: theirProfile.profileImage, userKey: theirKey, type: type}
            ],
            messages: [],
            startDate: new Date()
        }
        console.log('new Chat', newChat)
        dispatch(startNewChatInit())
        axios.post(`/chats.json?auth=${authToken}`, newChat)
            .then(response => {
                chatKey = response.data.name;
                return axios.put(`/chats/${chatKey}.json?auth=${authToken}`, {...newChat, key: chatKey})
                    .then(response => {
                        myNewProfile = {...myProfile}
                        let myNewChats;
                        if (myNewProfile.chats) {
                            myNewChats = {...myNewProfile.chats, [theirKey]: chatKey}
                        } else {
                            myNewChats = {[theirKey] : chatKey}
                        }
                        myNewProfile.chats = myNewChats;

                        theirNewProfile = {...theirProfile}
                        let theirNewChats;
                        if (theirNewProfile.chats) {
                            theirNewChats = {...theirNewProfile.chats, [myProfile.userKey]: chatKey}
                        } else {
                            theirNewChats = {[myProfile.userKey]: chatKey}
                        }
                        theirNewProfile.chats = theirNewChats
                        let theirProfilePath;
                        if (type === 'PAGE') {
                            theirProfilePath = `/pages/${theirKey}.json?auth=${authToken}`;
                        } else {
                            theirProfilePath = `/public-profiles/${theirNewProfile.publicProfileKey}.json?auth=${authToken}`;
                        }
                        return axios.put(theirProfilePath, theirNewProfile)
                    })
                    .then(response => {
                        return axios.put(`/public-profiles/${myNewProfile.publicProfileKey}.json?auth=${authToken}`, myNewProfile)
                    })
                    .then(response => {
                        return axios.patch(`/users/${myNewProfile.userKey}.json?auth=${authToken}`, {activeChat:{...newChat, key: chatKey}})
                    })
                    .then(response => {
                        dispatch(startNewChatSuccess(newChat))
                    })
                    .catch(error => {
                        dispatch(startNewChatFail(error))
                    })
            })
            .catch(error => {
                dispatch(startNewChatFail(error))
            })

    }
}


// export const startNewChatAttempt = (authToken, myProfile, theirProfile, type) => {
//     return dispatch => {
//         let chatKey;
//         let myNewProfile;
//         let theirNewProfile;
//         let theirKey;
//         let theirName;
//         if (type === 'PAGE') {
//             theirKey = theirProfile.dbKey;
//             theirName = theirProfile.name;
//         } else {
//             theirKey = theirProfile.userKey;
//             theirName = theirProfile.firstName + ' ' + theirProfile.lastName;
//         }
//         const newChat = {
//             parties: [
//                     {name: myProfile.firstName + ' ' + myProfile.lastName, profileImage: myProfile.profileImage, userKey:myProfile.userKey},
//                     {name: theirName, profileImage: theirProfile.profileImage, userKey: theirKey, type: type}
//                 ],
//             messages: [],
//             startDate: new Date()
//         }
//         console.log('new Chat ', newChat)
//         dispatch(startNewChatInit())
//         axios.post(`/chats.json?auth=${authToken}`, newChat)
//             .then(response => {
//                 chatKey = response.data.name;
//                 return axios.put(`/chats/${chatKey}.json?auth=${authToken}`, {...newChat, key: chatKey})
//                     .then(response => {
//                         myNewProfile = {...myProfile}
//                         let myNewChats;
//                         if (myNewProfile.chats) {
//                             myNewChats = {...myNewProfile.chats, [theirKey]: chatKey}
//                         } else {
//                             myNewChats = {[theirKey] : chatKey}
//                         }
//                         myNewProfile.chats = myNewChats;
//
//                         theirNewProfile = {...theirProfile}
//                         let theirNewChats;
//                         if (theirNewProfile.chats) {
//                             theirNewChats = {...theirNewProfile.chats, [myProfile.userKey]: chatKey}
//                         } else {
//                             theirNewChats = {[myProfile.userKey]: chatKey}
//                         }
//                         theirNewProfile.chats = theirNewChats
//                         let theirProfilePath;
//                         if (type === 'PAGE') {
//                             theirProfilePath = `/pages/${theirKey}.json?auth=${authToken}`;
//                         } else {
//                             theirProfilePath = `/public-profiles/${theirNewProfile.publicProfileKey}.json?auth=${authToken}`;
//                         }
//                         return axios.put(theirProfilePath, theirNewProfile)
//                     })
//                     .then(response => {
//                         return axios.put(`/public-profiles/${myNewProfile.publicProfileKey}.json?auth=${authToken}`, myNewProfile)
//                     })
//                     .then(response => {
//                         return axios.put(`/activeChat.json?auth=${authToken}`, {...newChat, key: chatKey})
//                     })
//                     .then(response => {
//                         dispatch(startNewChatSuccess(newChat))
//                     })
//                     .catch(error => {
//                         dispatch(startNewChatFail(error))
//                     })
//             })
//             .catch(error => {
//                 dispatch(startNewChatFail(error))
//             })
//
//     }
// }

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
                return axios.patch(`/users/${userKey}/activeChat.json?auth=${authToken}`, {...response.data})
            })
            .then(response => {
                console.log(response.data)
                dispatch(restartOldChatSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(restartOldChatFail(error));
            })
    }
}

// export const restartOldChatAttempt = (authToken, chatKey) => {
//     return dispatch => {
//         dispatch(restartOldChatInit());
//         axios.get(`/chats/${chatKey}.json?auth=${authToken}`)
//             .then(response => {
//                 return axios.put(`/activeChat-${chatKey}.json?auth=${authToken}`, response.data)
//             })
//             .then(response => {
//                 dispatch(restartOldChatSuccess(response.data));
//             })
//             .catch(error => {
//                 console.log(error);
//                 dispatch(restartOldChatFail(error));
//             })
//     }
// }

const sendMessageInit = () => {
    return {
        type: actionTypes.SEND_MESSAGE_INIT
    }
}

const sendMessageSuccess = (chat) => {
    return {
        type: actionTypes.SEND_MESSAGE_SUCCESS,
        chat: chat
    }
}

const sendMessageFail = (error) => {
    return {
        type: actionTypes.SEND_MESSAGE_FAIL,
        error: error
    }
}

export const sendMessageAttempt = (authToken, chatKey, message) => {
    return dispatch => {
        let newChat;
        dispatch(sendMessageInit());
        KeyGenerator.getKey(authToken, (newKey) => {
            const newMessage = {...message, id: newKey}
            console.log('newMessage', newMessage)
            axios.get(`/chats/${chatKey}/messages.json?auth=${authToken}`)
                .then(response => {
                    if (response.data && response.data.length) {
                        newChat = [...response.data, newMessage]
                    } else {
                        newChat = [newMessage]
                    }
                    return axios.put(`/chats/${chatKey}/messages.json?auth=${authToken}`, newChat)
                })
                .then(response => {
                    console.log('put message', response);
                    dispatch(sendMessageSuccess(newChat))
                })
                .catch(error => {
                    dispatch(sendMessageFail(error));
                })
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
                console.log('FETCHED ACTIVE CHAT', response.data);
                dispatch(fetchActiveChatSuccess(response.data))
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
    return dispatch => {
        dispatch(clearActiveChatInit())
        axios.delete(`/users/${userKey}/activeChat.json?auth=${authToken}`)
            .then(response => {
                dispatch(clearActiveChatSuccess())
            })
            .catch(error => {
                dispatch(clearActiveChatFail(error))
            })
    }
}

const fetchChatRecordInit = () => {
    return {
        type: actionTypes.FETCH_CHAT_RECORD_INIT
    }
}

const fetchChatRecordSuccess = (chat) => {
    return {
        type: actionTypes.FETCH_CHAT_RECORD_SUCCESS,
        chat: chat
    }
}

const fetchChatRecordFail = (error) => {
    return {
        type: actionTypes.FETCH_CHAT_RECORD_FAIL,
        error: error
    }
}

export const fetchChatRecordAttempt = (authToken, chatKey) => {
    return dispatch => {
        dispatch(fetchChatRecordInit())
        axios.get(`/chats/${chatKey}.json?auth=${authToken}`)
            .then(response => {
                dispatch(fetchChatRecordSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchChatRecordFail(error))
            })
    }
}