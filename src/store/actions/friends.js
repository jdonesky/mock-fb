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
              if (senderNewPublicProfile.friendRequests && senderNewPublicProfile.friendRequests.sent && senderNewPublicProfile.friendRequests.sent.length) {
                  newSentRequests = [...senderNewPublicProfile.friendRequests.sent, {name: recipientNewPublicProfile.firstName + ' ' + recipientNewPublicProfile.lastName, publicProfileKey: recipientKey, userKey: recipientNewPublicProfile.userKey }]
              } else {
                  newSentRequests = [{name: recipientNewPublicProfile.firstName + ' ' + recipientNewPublicProfile.lastName, publicProfileKey: recipientKey, userKey: recipientNewPublicProfile.userKey}]
              }
              let newReceivedRequests;
              if (recipientNewPublicProfile.friendRequests && senderNewPublicProfile.friendRequests.received && senderNewPublicProfile.friendRequests.received.length) {
                  newReceivedRequests = [...recipientNewPublicProfile.friendRequests.received, {name: senderNewPublicProfile.firstName + ' ' + senderNewPublicProfile.lastName, publicProfileKey: senderKey, userKey: senderNewPublicProfile.userKey }]
              } else {
                  newReceivedRequests = [{name: senderNewPublicProfile.firstName + ' ' + senderNewPublicProfile.lastName, publicProfileKey: senderKey, userKey: senderNewPublicProfile.userKey }]
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
        dispatch(cancelFriendRequestInit());
        const getSender = axios.get(`/public-profiles/${senderKey}.json?auth=${authToken}`);
        const getRecipient = axios.get(`/public-profiles/${recipientKey}.json?auth=${authToken}`);

        return Promise.all([getSender, getRecipient])
            .then(responses => {
                console.log(responses)
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
                console.log('SUCCESS - get', response.data.friendRequests);
                dispatch(fetchFriendRequestsSuccess(response.data.friendRequests))
            })
            .catch(error => {
                console.log('FAIL - get', error)
                dispatch(fetchFriendRequestsFail(error))
            })
    }
}