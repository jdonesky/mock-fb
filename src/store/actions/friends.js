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
              console.log('sender', responses[0].data);
              console.log('recipient', responses[1].data);

              const sentRequest = {name: recipientNewPublicProfile.firstName + ' ' + recipientNewPublicProfile.lastName, publicProfileKey: recipientKey, userKey: recipientNewPublicProfile.userKey, date: new Date()};
              if (senderNewPublicProfile.friendRequests && senderNewPublicProfile.friendRequests.sent && senderNewPublicProfile.friendRequests.sent.length) {
                  newSentRequests = [...senderNewPublicProfile.friendRequests.sent, sentRequest]
              } else {
                  newSentRequests = [sentRequest]
              }

              let newReceivedRequests;
              const receivedRequest = {name: senderNewPublicProfile.firstName + ' ' + senderNewPublicProfile.lastName, publicProfileKey: senderKey, userKey: senderNewPublicProfile.userKey, date: new Date() }
              if (recipientNewPublicProfile.friendRequests && senderNewPublicProfile.friendRequests.received && senderNewPublicProfile.friendRequests.received.length) {
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
              console.log('sender after', senderNewPublicProfile);
              console.log('recipient after', recipientNewPublicProfile);

              const recordSent = axios.put(`/public-profiles/${senderKey}.json?auth=${authToken}`, senderNewPublicProfile)
              const recordReceived = axios.put(`/public-profiles/${recipientKey}.json?auth=${authToken}`, recipientNewPublicProfile)

              return Promise.all([recordSent, recordReceived])
                  .then(responses => {
                      console.log('SUCCESS - put responses ', responses)
                      dispatch(sendFriendRequestSuccess(newSentRequests))
                  })
                  .catch(error => {
                      console.log('FAIL - put error', error)
                      dispatch(sendFriendRequestFail(error))
                  })
          })
          .catch(error => {
              console.log('FAIL - get error', error)
              dispatch(sendFriendRequestFail(error))
          })

  }
}

const cancelFriendRequestInit = () => {
    return {
        type: actionTypes.CANCEL_FRIEND_REQUEST_INIT,
    };
};

const cancelFriendRequestSuccess = (friends) => {
    return {
        type: actionTypes.CANCEL_FRIEND_REQUEST_SUCCESS,
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

const acceptFriendRequestInit = () => {
    return {
        type: actionTypes.ACCEPT_FRIEND_REQUEST_INIT
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

export const acceptFriendRequestAttempt = (authToken, senderKey, recipientKey) => {
    return dispatch => {
        let senderNewPublicProfile;
        let newReceivedRequests;
        let newFriends;
        let recipientNewPublicProfile;
        dispatch(acceptFriendRequestInit());
        const getSender = axios.get(`/public-profiles/${senderKey}.json?auth=${authToken}`);
        const getRecipient = axios.get(`/public-profiles/${recipientKey}.json?auth=${authToken}`);

        return Promise.all([getSender, getRecipient])
            .then(responses => {
                senderNewPublicProfile = {...responses[0].data}
                recipientNewPublicProfile = {...responses[1].data}
                console.log('sender', responses[0].data);
                console.log('recipient', responses[1].data);

                const sendersNewFriend = {...senderNewPublicProfile.friendRequests.sent.find(req => req.userKey === recipientNewPublicProfile.userKey), profileImage: recipientNewPublicProfile.profileImage}
                console.log('sendersNewFriend', sendersNewFriend);
                let sendersNewFriends;
                if (senderNewPublicProfile.friends && senderNewPublicProfile.friends.length) {
                    sendersNewFriends = [...senderNewPublicProfile.friends, sendersNewFriend]
                } else {
                    sendersNewFriends = [sendersNewFriend]
                }
                senderNewPublicProfile.friends = sendersNewFriends

                const recipientsNewFriend = {...recipientNewPublicProfile.friendRequests.received.find(req => req.userKey === senderNewPublicProfile.userKey), profileImage: senderNewPublicProfile.profileImage }
                console.log('recipient/MYNewFriend', recipientsNewFriend)
                if (recipientNewPublicProfile.friends && recipientNewPublicProfile.friends.length) {
                    newFriends = [...recipientNewPublicProfile.friends, recipientsNewFriend];
                } else {
                    newFriends = [recipientsNewFriend];
                }

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
                console.log('sender after', senderNewPublicProfile);
                console.log('recipient after', recipientNewPublicProfile);

                const recordSent = axios.put(`/public-profiles/${senderKey}.json?auth=${authToken}`, senderNewPublicProfile)
                const recordReceived = axios.put(`/public-profiles/${recipientKey}.json?auth=${authToken}`, recipientNewPublicProfile)

                return Promise.all([recordSent, recordReceived])
                    .then(responses => {
                        console.log('SUCCESS - put responses ', responses)
                        dispatch(acceptFriendRequestSuccess(newReceivedRequests, newFriends))
                    })
                    .catch(error => {
                        console.log('FAIL - put error', error)
                        dispatch(acceptFriendRequestFail(error))
                    })
            })
            .catch(error => {
                console.log('FAIL - get error', error)
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
                console.log('sender', responses[0].data);
                console.log('recipient', responses[1].data);

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
                console.log('sender after', senderNewPublicProfile);
                console.log('recipient after', recipientNewPublicProfile);

                const recordSent = axios.put(`/public-profiles/${senderKey}.json?auth=${authToken}`, senderNewPublicProfile)
                const recordReceived = axios.put(`/public-profiles/${recipientKey}.json?auth=${authToken}`, recipientNewPublicProfile)

                return Promise.all([recordSent, recordReceived])
                    .then(responses => {
                        console.log('SUCCESS - put responses ', responses)
                        dispatch(denyFriendRequestSuccess(newReceivedRequests))
                    })
                    .catch(error => {
                        console.log('FAIL - put error', error)
                        dispatch(denyFriendRequestFail(error))
                    })
            })
            .catch(error => {
                console.log('FAIL - get error', error)
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

const fetchFriendsSuccess = (requests) => {
    return {
        type: actionTypes.FETCH_FRIENDS_SUCCESS,
        requests: requests
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
                console.log('SUCCESS - ', response.data.friends)
                dispatch(fetchFriendsSuccess(response.data.friends))
            })
            .catch(error => {
                dispatch(fetchFriendsFail(error))
            })
    }
}

