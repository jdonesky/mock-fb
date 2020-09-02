import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";

const updateProfileInit = () => {
  return {
    type: actionTypes.UPDATE_PROFILE_INIT,
  };
};

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
    dispatch(updateProfileInit());
    console.log(userProfile);
    const deleteParams = `/${userProfile.userId}/?auth=${authToken}`;
    const postParams = `?auth=${authToken}`
    // axios
    //   .delete("/users.json" + queryParams, {
    //     params: { id: userProfile.userId },
    //   })
    axios.delete("/users.json" + deleteParams).then((response) => {
      axios
        .post("/users.json" + postParams, userProfile)
        .then((response) => {
          console.log(response);
          dispatch(storeProfileSuccess(userProfile));
        })
        .catch((err) => {
          console.log(err);
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
    dispatch(updateProfileInit());
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

const statusUpdateInit = () => {
  return {
    type: actionTypes.STATUS_UPDATE_INIT,
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
    dispatch(statusUpdateInit());
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

export const clearProfile = () => {
  return {
    type: actionTypes.CLEAR_PROFILE,
  };
};
