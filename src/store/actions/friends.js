import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";

const sendFriendRequestInit = () => {
  return {
    type: actionTypes.SEND_FRIEND_REQUEST_INIT,
  };
};

const sendFriendRequestSuccess = (sentRequests) => {
  return {
    type: actionTypes.SEND_FRIEND_REQUEST_SUCCESS,
    sentRequests: sentRequests
  };
};

const sendFriendRequestFail = (error) => {
  return {
    type: actionTypes.SEND_FRIEND_REQUEST_FAIL,
    error: error,
  };
};

export const sendFriendRequestAttempt = (authToken, senderKey, recipientKey) => {
  return (dispatch) => {
      let senderNewPublicProfile;
      let newSentRequests;
      let recipientNewPublicProfile;
      dispatch(sendFriendRequestInit());
      const getSender = axios.get(`/public-profiles/${senderKey}.json?auth=${authToken}`);
      const getRecipient = axios.get(`/public-profiles/${recipientKey}.json?auth=${authToken}`);

      return Promise.all([getSender, getRecipient])
          .then(responses => {
              senderNewPublicProfile = {...responses[0].data}
              recipientNewPublicProfile = {...responses[1].data}

              const sentRequest = {name: recipientNewPublicProfile.firstName + ' ' + recipientNewPublicProfile.lastName, publicProfileKey: recipientKey, userKey: recipientNewPublicProfile.userKey, userId: recipientNewPublicProfile.userId, date: new Date()};
              if (senderNewPublicProfile.friendRequests && senderNewPublicProfile.friendRequests.sent && senderNewPublicProfile.friendRequests.sent.length) {
                  newSentRequests = [...senderNewPublicProfile.friendRequests.sent, sentRequest]
              } else {
                  newSentRequests = [sentRequest]
              }

              let newReceivedRequests;
              const receivedRequest = {name: senderNewPublicProfile.firstName + ' ' + senderNewPublicProfile.lastName, publicProfileKey: senderKey, userKey: senderNewPublicProfile.userKey, userId: senderNewPublicProfile.userId, date: new Date() }
              if (recipientNewPublicProfile.friendRequests && recipientNewPublicProfile.friendRequests.received && recipientNewPublicProfile.friendRequests.received.length) {
                  newReceivedRequests = [...recipientNewPublicProfile.friendRequests.received, receivedRequest]
              } else {
                  newReceivedRequests = [receivedRequest]
              }

              if (senderNewPublicProfile.friendRequests && senderNewPublicProfile.friendRequests.received && senderNewPublicProfile.friendRequests.received.length) {
                senderNewPublicProfile.friendRequests = {sent: newSentRequests, received: [...senderNewPublicProfile.friendRequests.received]}
              } else {
                senderNewPublicProfile.friendRequests = {sent: newSentRequests, received: []}
              }
              if (recipientNewPublicProfile.friendRequests && recipientNewPublicProfile.friendRequests.sent && recipientNewPublicProfile.friendRequests.sent.length) {
                  recipientNewPublicProfile.friendRequests = {received: newReceivedRequests, sent: [...recipientNewPublicProfile.friendRequests.sent]}
              } else {
                  recipientNewPublicProfile.friendRequests = {received: newReceivedRequests, sent: []}
              }

              const recordSent = axios.put(`/public-profiles/${senderKey}.json?auth=${authToken}`, senderNewPublicProfile)
              const recordReceived = axios.put(`/public-profiles/${recipientKey}.json?auth=${authToken}`, recipientNewPublicProfile)

              return Promise.all([recordSent, recordReceived])
                  .then(responses => {
                      dispatch(sendFriendRequestSuccess(newSentRequests))
                  })
                  .catch(error => {
                      dispatch(sendFriendRequestFail(error))
                  })
          })
          .catch(error => {
              dispatch(sendFriendRequestFail(error))
          })

  }
}

const cancelFriendRequestInit = () => {
    return {
        type: actionTypes.CANCEL_FRIEND_REQUEST_INIT,
    };
};

const cancelFriendRequestSuccess = (newSentRequests) => {
    return {
        type: actionTypes.CANCEL_FRIEND_REQUEST_SUCCESS,
        sentRequests: newSentRequests
    };
};

const cancelFriendRequestFail = (error) => {
    return {
        type: actionTypes.CANCEL_FRIEND_REQUEST_FAIL,
        error: error,
    };
};

export const cancelFriendRequestAttempt = (authToken, senderKey, recipientKey) => {
    return (dispatch) => {
        let senderNewPublicProfile;
        let newSentRequests;
        let recipientNewPublicProfile;
        dispatch(cancelFriendRequestInit());
        const getSender = axios.get(`/public-profiles/${senderKey}.json?auth=${authToken}`);
        const getRecipient = axios.get(`/public-profiles/${recipientKey}.json?auth=${authToken}`);

        return Promise.all([getSender, getRecipient])
            .then(responses => {
                senderNewPublicProfile = {...responses[0].data}
                recipientNewPublicProfile = {...responses[1].data}

                newSentRequests = senderNewPublicProfile.friendRequests.sent.filter(req => req.publicProfileKey !== recipientKey)
                senderNewPublicProfile.friendRequests.sent = newSentRequests

                const newReceivedRequests =  recipientNewPublicProfile.friendRequests.received.filter(req => req.publicProfileKey !== senderKey)
                recipientNewPublicProfile.friendRequests.received = newReceivedRequests

                const recordCancelSent = axios.put(`/public-profiles/${senderKey}.json?auth=${authToken}`, senderNewPublicProfile)
                const recordCancelReceived = axios.put(`/public-profiles/${recipientKey}.json?auth=${authToken}`, recipientNewPublicProfile)

                return Promise.all([recordCancelSent, recordCancelReceived])
                    .then(responses => {
                        dispatch(cancelFriendRequestSuccess(newSentRequests));
                    })
                    .catch(error => {
                        dispatch(cancelFriendRequestFail(error));
                    })
            })
            .catch(error => {
                dispatch(cancelFriendRequestFail(error));
            })
    }
}

const acceptFriendRequestInit = (userKey) => {
    return {
        type: actionTypes.ACCEPT_FRIEND_REQUEST_INIT,
        userKey: userKey
    }
}

const acceptFriendRequestSuccess = (newReceivedRequests, newFriends) => {
    return {
        type: actionTypes.ACCEPT_FRIEND_REQUEST_SUCCESS,
        receivedRequests: newReceivedRequests,
        friends: newFriends
    }
}

const acceptFriendRequestFail = (error) => {
    return {
        type: actionTypes.ACCEPT_FRIEND_REQUEST_FAIL,
        error: error
    }
}

export const acceptFriendRequestAttempt = (authToken, senderKey, recipientKey, cb) => {
    return dispatch => {
        let senderNewPublicProfile;
        let recipientNewPublicProfile;
        let newReceivedRequests;
        let newFriends;
        dispatch(acceptFriendRequestInit(senderKey));
        const getSender = axios.get(`/public-profiles/${senderKey}.json?auth=${authToken}`);
        const getRecipient = axios.get(`/public-profiles/${recipientKey}.json?auth=${authToken}`);

        return Promise.all([getSender, getRecipient])
            .then(responses => {
                senderNewPublicProfile = {...responses[0].data}
                recipientNewPublicProfile = {...responses[1].data}

                const sendersNewFriend = {...senderNewPublicProfile.friendRequests.sent.find(req => req.userKey === recipientNewPublicProfile.userKey), profileImage: recipientNewPublicProfile.profileImage}
                let sendersNewFriends;
                if (senderNewPublicProfile.friends && senderNewPublicProfile.friends.length) {
                    sendersNewFriends = [...senderNewPublicProfile.friends, sendersNewFriend]
                } else {
                    sendersNewFriends = [sendersNewFriend]
                }
                senderNewPublicProfile.friends = sendersNewFriends

                const recipientsNewFriend = {...recipientNewPublicProfile.friendRequests.received.find(req => req.userKey === senderNewPublicProfile.userKey), profileImage: senderNewPublicProfile.profileImage }
                if (recipientNewPublicProfile.friends && recipientNewPublicProfile.friends.length) {
                    newFriends = [...recipientNewPublicProfile.friends, recipientsNewFriend];
                } else {
                    newFriends = [recipientsNewFriend];
                }
                recipientNewPublicProfile.friends = newFriends;

                const newSentRequests = senderNewPublicProfile.friendRequests.sent.filter(req => req.userKey !== recipientNewPublicProfile.userKey)
                newReceivedRequests = recipientNewPublicProfile.friendRequests.received.filter(req => req.userKey !== senderNewPublicProfile.userKey)

                if (senderNewPublicProfile.friendRequests && senderNewPublicProfile.friendRequests.received && senderNewPublicProfile.friendRequests.received.length) {
                    senderNewPublicProfile.friendRequests = {sent: newSentRequests, received: [...senderNewPublicProfile.friendRequests.received]}
                } else {
                    senderNewPublicProfile.friendRequests = {sent: newSentRequests, received: []}
                }
                if (recipientNewPublicProfile.friendRequests && recipientNewPublicProfile.friendRequests.sent && recipientNewPublicProfile.friendRequests.sent.length) {
                    recipientNewPublicProfile.friendRequests = {received: newReceivedRequests, sent: [...recipientNewPublicProfile.friendRequests.sent]}
                } else {
                    recipientNewPublicProfile.friendRequests = {received: newReceivedRequests, sent: []}
                }

                const recordSent = axios.put(`/public-profiles/${senderKey}.json?auth=${authToken}`, senderNewPublicProfile)
                const recordReceived = axios.put(`/public-profiles/${recipientKey}.json?auth=${authToken}`, recipientNewPublicProfile)

                const updateSenderFollows = axios.patch(`/follows/${senderNewPublicProfile.userId}/follows.json?auth=${authToken}`, {[recipientNewPublicProfile.userId]: sendersNewFriend})
                const updateRecipientFollows = axios.patch(`/follows/${recipientNewPublicProfile.userId}/follows.json?auth=${authToken}`, {[senderNewPublicProfile.userId]: recipientsNewFriend})


                return Promise.all([recordSent, recordReceived, updateSenderFollows, updateRecipientFollows])
                    .then(responses => {
                        dispatch(acceptFriendRequestSuccess(newReceivedRequests, newFriends))
                        if (cb) {
                            cb();
                        }
                    })
                    .catch(error => {
                        dispatch(acceptFriendRequestFail(error))
                    })
            })
            .catch(error => {
                dispatch(acceptFriendRequestFail(error))
            })
    }
}

const denyFriendRequestInit = () => {
    return {
        type: actionTypes.DENY_FRIEND_REQUEST_INIT
    }
}

const denyFriendRequestSuccess = (newReceivedRequests) => {
    return {
        type: actionTypes.DENY_FRIEND_REQUEST_SUCCESS,
        requests: newReceivedRequests
    }
}

const denyFriendRequestFail = (error) => {
    return {
        type: actionTypes.DENY_FRIEND_REQUEST_FAIL,
        error: error
    }
}

export const denyFriendRequestAttempt = (authToken, senderKey, recipientKey) => {
    return dispatch => {
        let senderNewPublicProfile;
        let recipientNewPublicProfile;
        let newReceivedRequests;
        dispatch(denyFriendRequestInit());
        const getSender = axios.get(`/public-profiles/${senderKey}.json?auth=${authToken}`);
        const getRecipient = axios.get(`/public-profiles/${recipientKey}.json?auth=${authToken}`);
        return Promise.all([getSender, getRecipient])
            .then(responses => {
                senderNewPublicProfile = {...responses[0].data}
                recipientNewPublicProfile = {...responses[1].data}

                const newSentRequests = senderNewPublicProfile.friendRequests.sent.filter(req => req.userKey !== recipientNewPublicProfile.userKey)
                newReceivedRequests = recipientNewPublicProfile.friendRequests.received.filter(req => req.userKey !== senderNewPublicProfile.userKey)

                if (senderNewPublicProfile.friendRequests && senderNewPublicProfile.friendRequests.received && senderNewPublicProfile.friendRequests.received.length) {
                    senderNewPublicProfile.friendRequests = {sent: newSentRequests, received: [...senderNewPublicProfile.friendRequests.received]}
                } else {
                    senderNewPublicProfile.friendRequests = {sent: newSentRequests, received: []}
                }
                if (recipientNewPublicProfile.friendRequests && recipientNewPublicProfile.friendRequests.sent && recipientNewPublicProfile.friendRequests.sent.length) {
                    recipientNewPublicProfile.friendRequests = {received: newReceivedRequests, sent: [...recipientNewPublicProfile.friendRequests.sent]}
                } else {
                    recipientNewPublicProfile.friendRequests = {received: newReceivedRequests, sent: []}
                }

                const recordSent = axios.put(`/public-profiles/${senderKey}.json?auth=${authToken}`, senderNewPublicProfile)
                const recordReceived = axios.put(`/public-profiles/${recipientKey}.json?auth=${authToken}`, recipientNewPublicProfile)

                return Promise.all([recordSent, recordReceived])
                    .then(responses => {
                        dispatch(denyFriendRequestSuccess(newReceivedRequests))
                    })
                    .catch(error => {
                        dispatch(denyFriendRequestFail(error))
                    })
            })
            .catch(error => {
                dispatch(denyFriendRequestFail(error))
            })
    }
}

const fetchFriendRequestsInit = () => {
    return {
        type: actionTypes.FETCH_FRIEND_REQUESTS_INIT
    }
}

const fetchFriendRequestsSuccess = (requests) => {
    return {
        type: actionTypes.FETCH_FRIEND_REQUESTS_SUCCESS,
        requests: requests
    }
}

const fetchFriendRequestsFail = (error) => {
    return {
        type: actionTypes.FETCH_FRIEND_REQUESTS_FAIL,
        error: error
    }
}

export const fetchFriendRequestsAttempt = (authToken, publicProfileKey) => {
    return dispatch => {
        dispatch(fetchFriendRequestsInit())
        axios.get(`/public-profiles/${publicProfileKey}.json?auth=${authToken}`)
            .then(response => {
                dispatch(fetchFriendRequestsSuccess(response.data.friendRequests))
            })
            .catch(error => {
                dispatch(fetchFriendRequestsFail(error))
            })
    }
}

const fetchFriendsInit = () => {
    return {
        type: actionTypes.FETCH_FRIENDS_INIT
    }
}

const fetchFriendsSuccess = (friends) => {
    return {
        type: actionTypes.FETCH_FRIENDS_SUCCESS,
        friends: friends
    }
}

const fetchFriendsFail = (error) => {
    return {
        type: actionTypes.FETCH_FRIENDS_FAIL,
        error: error
    }
}

export const fetchFriendsAttempt = (authToken, publicProfileKey) => {
    return dispatch => {
        dispatch(fetchFriendsInit())
        axios.get(`/public-profiles/${publicProfileKey}.json?auth=${authToken}`)
            .then(response => {
                dispatch(fetchFriendsSuccess(response.data.friends))
            })
            .catch(error => {
                dispatch(fetchFriendsFail(error))
            })
    }
}

const fetchFollowingIdsInit = () => {
    return {
        type: actionTypes.FETCH_FOLLOWING_IDS_INIT
    }
}

const fetchFollowingIdsSuccess = (ids) => {
    return {
        type: actionTypes.FETCH_FOLLOWING_IDS_SUCCESS,
        ids: ids
    }
}

const fetchFollowingIdsFail = (error) => {
    return {
        type: actionTypes.FETCH_FOLLOWING_IDS_FAIL,
        error: error
    }
}


export const fetchFollowingIdsAttempt = (authToken, userId, cb) => {
    return dispatch => {
        dispatch(fetchFollowingIdsInit());
        axios.get(`/follows/${userId}/follows.json?shallow=true&auth=${authToken}`)
            .then(response => {
                let ids = response.data ? Object.keys(response.data) : null;
                dispatch(fetchFollowingIdsSuccess(ids))
                cb(ids);
            })
            .catch(error => {
                dispatch(fetchFollowingIdsFail(error));
            })
    }
}

export const updateFollowedOnline = (userStatus) => {
    return {
        type: actionTypes.UPDATE_FOLLOWED_ONLINE,
        userStatus: userStatus
    }
}

export const clearFriends = () => {
    return {
        type: actionTypes.CLEAR_FRIENDS
    }
}

export const logoutClearFriends = () => {
    return {
        type: actionTypes.LOGOUT_CLEAR_FRIENDS
    }
}
