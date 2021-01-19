import * as actionTypes from "./actionTypes";
import * as actions from "./index"
import axios from '../../axios/db-axios-instance';
import axiosSignIn from "../../axios/signin-axios-instance";
import axiosSignUp from "../../axios/signup-axios-instance";
import firebase from '../../firebase';

const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authResetError = () => { 
  return {
    type: actionTypes.AUTH_RESET_ERROR
  }
}

export const authLogout = () => {
  return async dispatch => {
    const userId = await localStorage.getItem('userId')
    const authToken = await localStorage.getItem('authToken');
    if (userId && authToken) {
      axios.delete(`/follows/${userId}/isOnline.json?auth=${authToken}`)
          .then(response => {
            dispatch(logout())
          })
          .catch(error => {
            dispatch(logout());
          })
      // dispatch(logout())
    }
  }
}

export const logout = () => {
  localStorage.removeItem("authToken");
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
      dispatch(actions.logoutClearProfile());
      dispatch(actions.logoutClearPages());
      dispatch(actions.logoutClearPosts());
      dispatch(actions.logoutClearActivity());
      dispatch(actions.logoutClearUsers());
      dispatch(actions.logoutClearMessenger());
      dispatch(actions.logoutClearSearch());
      dispatch(actions.logoutClearFriends());
      dispatch(actions.logoutClearPhotos());
    }, expirationTime * 1000);
  };
};

export const authAttempt = (email, password, isSignUp, userData) => {
  return (dispatch) => {
    dispatch(authInit());
    const axiosInstance = isSignUp ? axiosSignUp : axiosSignIn;

    // MOCK FB3
    // const apiKey = process.env.REACT_APP_API_KEY

    // POSTS-REFACTOR (testing db)
    const apiKey = "AIzaSyCpeemp4z9C5R77m8GSDpwbj2dF4OcFiIk"

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axiosInstance
      .post("?key=" + apiKey, authData)
      .then((response) => {
        const token = response.data.idToken;
        const userId = response.data.localId;
        const expirationTime = response.data.expiresIn;
        const expirationDate = new Date(
          new Date().getTime() + expirationTime * 1000
        );
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);

        axios.get(`/follows/${userId}/blockActiveOnLogin.json?auth=${token}`)
            .then(response => {
              if (!response.data || response.data === false) {
                  axios.patch(`/follows/${userId}.json?auth=${token}`, {isOnline: true})              } else {
              }
              dispatch(authSuccess(token, userId));
              dispatch(checkAuthTimeout(expirationTime));
            })
        if (isSignUp) {
          const newUserData = {userId: userId, ...userData}

          dispatch(actions.createProfileAttempt(token, newUserData))
        }

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(response => {
            })
            .catch(error => {
                dispatch(authFail(error));
            })
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch(authFail(error.response.data.error));
        }
      });
  };
};

export const autoSignIn = () => {
  return (dispatch) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      dispatch(authLogout());
      dispatch(actions.logoutClearProfile());
      dispatch(actions.logoutClearPages());
      dispatch(actions.logoutClearPosts());
      dispatch(actions.logoutClearActivity());
      dispatch(actions.logoutClearUsers());
      dispatch(actions.logoutClearMessenger());
      dispatch(actions.logoutClearSearch());
      dispatch(actions.logoutClearFriends());
      dispatch(actions.logoutClearPhotos());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate < new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        const newExpirationCountdown =
          (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(newExpirationCountdown));
      }
    }
  };
};
