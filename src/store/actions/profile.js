import * as actionTypes from "../actions/actionTypes";
import axios from '../../axios/db-axios-instance'

const storeProfileSuccess= (userProfile) => {
  return {
    type: actionTypes.STORE_PROFILE_SUCCESS,
    userProfile: userProfile
  };
};

const storeProfileFail = (error) => {
  return {
    type: actionTypes.STORE_PROFILE_FAIL,
    error: error
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



const fetchProfileSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    userData: userData
  } 
}

const fetchProfileFail = (err) => {
  return {
    type: actionTypes.FETCH_PROFILE_FAIL,
    error: err
  }
}

export const fetchProfileAttempt = (userId,authToken) => {
  return dispatch => {
    const queryParams = "?auth=" + authToken + '&orderBy="userId"&equalTo="' + userId + '"'
    axios.get('/users.json' + queryParams)
    .then(response => {
      
      const userData = Object.keys(response.data).map(key => {
        return {key: key, ...response.data[key]}
      })
      
      dispatch(fetchProfileSuccess(userData[0]))
    })
    .catch(err => {
      dispatch(fetchProfileFail(err))
    })
  }
}