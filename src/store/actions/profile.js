import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";

// ADD INIT ACTIONS TO TOGGLE LOADING STATE AND HANDLE IN REDUX

const updateInit = () => {
  return {
    type: actionTypes.UPDATE_INIT
  }
}


const storeProfileSuccess = (userProfile) => {
  return {
    type: actionTypes.STORE_PROFILE_SUCCESS,
    userProfile: userProfile,
  };
};

const storeProfileFail = (error) => {
  return {
    type: actionTypes.STORE_PROFILE_FAIL,
    error: error,
  };
};

export const storeProfileAttempt = (userProfile, authToken) => {
  return (dispatch) => {
    dispatch(updateInit())
    const queryParams = "?auth=" + authToken;
    axios
      .delete("/users.json" + queryParams, {
        params: { userId: userProfile.id },
      })
      .then((response) => {
        axios
          .post("/users.json?auth=" + authToken, userProfile)
          .then((response) => {
            dispatch(storeProfileSuccess(userProfile));
          })
          .catch((err) => {
            dispatch(storeProfileFail(err));
          });
      });
  };
};


const fetchProfileSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    userData: userData,
  };
};

const fetchProfileFail = (err) => {
  return {
    type: actionTypes.FETCH_PROFILE_FAIL,
    error: err,
  };
};

export const fetchProfileAttempt = (userId, authToken) => {
  return (dispatch) => {
    dispatch(updateInit())
    const queryParams =
      "?auth=" + authToken + '&orderBy="userId"&equalTo="' + userId + '"';
    axios 
      .get("/users.json" + queryParams)
      .then((response) => {
        const userData = Object.keys(response.data).map((key) => {
          return { key: key, ...response.data[key] };
        });
        dispatch(fetchProfileSuccess(userData[0]));
      })
      .catch((err) => {
        dispatch(fetchProfileFail(err));
      });
  };
};

const statusUpdateSuccess = (status) => {
  return {
    type: actionTypes.STATUS_UPDATE_SUCCESS,
    status: status,
  };
};

const statusUpdateFail = (error) => {
  return {
    type: actionTypes.STATUS_UPDATE_FAIL,
    error: error,
  };
};

export const statusUpdateAttempt = (authToken, statusInfo) => {
  return (dispatch) => {
    dispatch(updateInit())
    axios
      .post("/posts.json?auth=" + authToken, statusInfo)
      .then(() => {
        dispatch(statusUpdateSuccess(statusInfo.status));
      })
      .catch((error) => {
        dispatch(statusUpdateFail(error));
      });
  };
};
