import * as actionTypes from "./actionTypes";
import axiosSignIn from "../../axios/signin-axios-instance";
import axiosSignUp from "../../axios/signup-axios-instance";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authAttempt = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const axiosInstance = isSignUp ? axiosSignUp : axiosSignIn;
    console.log(axiosInstance)
    const apiKey = "AIzaSyC2RIc06eEUq6CxLw1qe9kvqvgyHK-ibfI";
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axiosInstance
      .post("?key=" + apiKey, authData)
      .then((response) => {
        console.log(response);
        const token = response.data.idToken;
        const userId = response.data.localId;
        const expirationTime = response.data.expiresIn;

        const expirationDate = new Date(
          new Date().getTime() + expirationTime * 1000
        );

        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);

        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expirationTime));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const autoSignIn = (token, userId, expirationDate) => {};
