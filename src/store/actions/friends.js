import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";

const sendFriendRequestInit = () => {
  return {
    type: actionTypes.SEND_FRIEND_REQUEST_INIT,
  };
};

const sendFriendRequestSuccess = (friends) => {
  return {
    type: actionTypes.SEND_FRIEND_REQUEST_SUCCESS,
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
