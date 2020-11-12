import * as actionTypes from "./actionTypes";
import * as actions from "./index"
import axiosSignIn from "../../axios/signin-axios-instance";
import axiosSignUp from "../../axios/signup-axios-instance";

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
    }, expirationTime * 1000);
  };
};

export const authAttempt = (email, password, isSignUp, userData) => {
  return (dispatch) => {
    dispatch(authInit());
    const axiosInstance = isSignUp ? axiosSignUp : axiosSignIn;
    // const apiKey = "AIzaSyB5W7ME3bM5KwuPgpS1LKprmx4N_ePIgJQ";
    // const apiKey = "AIzaSyDVdLa2narRuGRbD8pVEhnqbr6meH26TNc"
    const apiKey = "AIzaSyD4T1w5B2QyiyC4gFZ_f1dmvZ8_ghJkX0E"

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

        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expirationTime));

        if (isSignUp) {
          const newUserData = {userId: userId, ...userData}
          console.log('IS SIGN UP', newUserData)
          dispatch(actions.createProfileAttempt(token, newUserData))
        }
      })
      .catch((error) => {
        // if (error.response.data) {
        //   console.log('[authAttempt] Error : ', error.response.data.error)
        //   dispatch(authFail(error.response.data.error));
        // }
        console.log(error);
      });
  };
};

export const autoSignIn = () => {
  return (dispatch) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      dispatch(authLogout());
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
