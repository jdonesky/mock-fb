import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";

const fetchFriendsInit = () => {
  return {
    type: actionTypes.FETCH_FRIENDS_INIT,
  };
};

const fetchFriendsSuccess = (friends) => {
  return {
    type: actionTypes.FETCH_FRIENDS_SUCCESS,
    friends: friends
  };
};

const fetchFriendsFail = (error) => {
  return {
    type: actionTypes.FETCH_FRIENDS_FAIL,
    error: error,
  };
};

export const fetchFriendsAttempt = (userId, authToken, cb) => {
  return (dispatch) => {
    dispatch(fetchFriendsInit());
    const queryUrl = '/users.json?auth=' + authToken + '&orderBy="userId"&equalTo="' + userId + '"'
    axios
      .get(queryUrl)
      .then((res) => {
          const friendIds = Object.keys(res.data).map(key => {
            return {friends: res.data[key].friends}
          })[0].friends
          const friendProfiles = []
          friendIds.forEach(id => {
              const queryFriend =  '/users.json?auth=' + authToken + '&orderBy="userId"&equalTo="' + id + '"'
              axios.get(queryFriend)
                  .then(res => {
                      const profile = Object.keys(res.data).map(key => {
                          return {fbKey: key, ...res.data[key]}
                      })
                      friendProfiles.push(profile)
                  })
                  .catch(err => console.log(err))
          })
          dispatch(fetchFriendsSuccess(friendProfiles))
        })
        // .then(result => {
        //     cb(result)
        // })
        .catch((error) => dispatch(fetchFriendsFail(error)));
  };
};

