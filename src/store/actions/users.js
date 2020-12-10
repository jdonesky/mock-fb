import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";

const fetchPublicProfileInit = () => {
  return {
    type: actionTypes.FETCH_PUBLIC_PROFILE_INIT,
  };
};

const fetchPublicProfileSuccess = (profile) => {
  return {
    type: actionTypes.FETCH_PUBLIC_PROFILE_SUCCESS,
    profile: profile
  };
};

const fetchPublicProfileFail = (error) => {
  return {
    type: actionTypes.FETCH_PUBLIC_PROFILE_FAIL,
    error: error,
  };
};

export const fetchPublicProfileAttempt = (authToken, publicProfileKey) => {
  return (dispatch) => {
    dispatch(fetchPublicProfileInit());
    axios.get(`/public-profiles/${publicProfileKey}.json?auth=${authToken}`)
    .then(response => {
        console.log(response.data)
        dispatch(fetchPublicProfileSuccess(response.data))
    })
    .catch(error => {
        dispatch(fetchPublicProfileFail(error))
    })
  };
};
