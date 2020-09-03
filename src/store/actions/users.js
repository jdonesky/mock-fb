import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";

const fetchUsersInit = () => {
  return {
    type: actionTypes.FETCH_USERS_INIT,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users,
  };
};

const fetchUsersFail = (error) => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error,
  };
};
export const fetchUsersAttempt = (authToken) => {
  return (dispatch) => {
    dispatch(fetchUsersInit());
    axios.get("/users.json?auth=" + authToken);
  };
};
