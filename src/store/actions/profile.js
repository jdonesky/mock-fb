import * as actionTypes from "../actions/actionTypes";
import axios from '../../axios/db-axios-instance'

const storeProfileSuccess= (userProfile) => {
  return {
    type: actionTypes.STORE_PROFILE_SUCCESS,
    userProfile: userProfile
  };
};

const storeProfileFail = (err) => {
  return {
    type: actionTypes.STORE_PROFILE_FAIL,
    error: err
  }
}

export const storeProfileAttempt = (userProfile, authToken) => {
  return dispatch => {
    axios.post('/users.json?auth=' + authToken, userProfile)
      .then(response => {
        dispatch(storeProfileSuccess(userProfile))
      })
      .catch( err => {
        dispatch(storeProfileFail(err))
      })
  }
}

export const storeUserStatus= (status) => {
  return {
    type: actionTypes.STORE_USER_STATUS,
    status: status, 
  };
};




const fetchProfileSuccess = (data) => {
  return {
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    profileData: data
  } 
}

const fetchProfileFail = (err) => {
  return {
    type: actionTypes.FETCH_PROFILE_FAIL,
    error: err
  }
}

export const fetchProfileAttempt = (userId, authToken) => {
  return dispatch => {

  }
}