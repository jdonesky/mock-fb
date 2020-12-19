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
        dispatch(fetchPublicProfileSuccess(response.data))
    })
    .catch(error => {
        dispatch(fetchPublicProfileFail(error))
    })
  };
};


const fetchFullProfileInit = () => {
  return {
    type: actionTypes.FETCH_FULL_PROFILE_INIT
  }
}

const fetchFullProfileSuccess = (profile) => {
  return {
    type: actionTypes.FETCH_FULL_PROFILE_SUCCESS,
    profile: profile
  }
}

const fetchFullProfileFail = (error) => {
  return {
    type: actionTypes.FETCH_FULL_PROFILE_FAIL,
    error: error
  }
}

export const fetchFullProfileAttempt = (userKey, authToken) => {
  return dispatch => {
    dispatch(fetchFullProfileInit());
    axios.get(`/users/${userKey}.json?auth=${authToken}`)
        .then(response => {
          console.log(response.data);
          dispatch(fetchFullProfileSuccess(response.data));
        })
        .catch(error => {
          console.log(error);
          dispatch(fetchFullProfileFail(error));
        })
  }
}


const fetchManyPublicProfilesInit = () => {
  return {
    type: actionTypes.FETCH_MANY_PUBLIC_PROFILES_INIT
  }
}

const fetchManyPublicProfilesSuccess = (profiles) => {
  return {
    type: actionTypes.FETCH_MANY_PUBLIC_PROFILES_SUCCESS,
    profiles: profiles
  }
}

const fetchManyPublicProfilesFail = (error) => {
  return {
    type: actionTypes.FETCH_MANY_PUBLIC_PROFILES_FAIL,
    error: error
  }
}

export const fetchManyPublicProfilesAttempt = (authToken, publicProfileKeys= []) => {
  return dispatch => {
    dispatch(fetchManyPublicProfilesInit())
    const queries = [];
    publicProfileKeys.forEach(key => {
      queries.push(axios.get(`/public-profiles/${key}.json?auth=${authToken}`))
    })
    return Promise.all(queries)
        .then(responses => {
          const profiles = responses.map(response => {
            if (response.data) {
              return response.data
            }
          })
          dispatch(fetchManyPublicProfilesSuccess(profiles));
        })
        .catch(error => {
          dispatch(fetchManyPublicProfilesFail(error));
        })
  }
}

export const clearUsers = () => {
  return {
    type: actionTypes.CLEAR_USERS
  }
}