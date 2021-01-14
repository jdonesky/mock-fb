import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";

const fetchPublicProfileInit = () => {
  return {
    type: actionTypes.FETCH_PUBLIC_PROFILE_INIT,
  };
};

const fetchProfileSummaryInit = () => {
  return {
    type: actionTypes.FETCH_PROFILE_SUMMARY_INIT,
  };
};

const fetchPublicProfileSuccess = (profile) => {
  return {
    type: actionTypes.FETCH_PUBLIC_PROFILE_SUCCESS,
    profile: profile
  };
};

const fetchProfileSummarySuccess = (profile) => {
  return {
    type: actionTypes.FETCH_PROFILE_SUMMARY_SUCCESS,
    profile: profile
  };
}

const fetchPublicProfileFail = (error) => {
  return {
    type: actionTypes.FETCH_PUBLIC_PROFILE_FAIL,
    error: error,
  };
};

const fetchProfileSummaryFail = (error) => {
  return {
    type: actionTypes.FETCH_PROFILE_SUMMARY_FAIL,
    error: error,
  };
}

export const fetchPublicProfileAttempt = (authToken, publicProfileKey, type) => {
  return (dispatch) => {
    let init;
    let success;
    let fail;
    if (type === 'SUMMARY') {
      init = fetchProfileSummaryInit;
      success = fetchProfileSummarySuccess;
      fail = fetchProfileSummaryFail;
    } else {
      init = fetchPublicProfileInit;
      success = fetchPublicProfileSuccess;
      fail = fetchPublicProfileFail;
    }
    dispatch(init());
    axios.get(`/public-profiles/${publicProfileKey}.json?auth=${authToken}`)
    .then(response => {
        dispatch(success(response.data))
    })
    .catch(error => {
        dispatch(fail(error))
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

const fetchManyPublicProfileRequestsInit = () => {
  return {
    type: actionTypes.FETCH_MANY_PUBLIC_PROFILE_REQUESTS_INIT
  }
}

const fetchManyPublicProfileRequestsSuccess = (profiles) => {
  return {
    type: actionTypes.FETCH_MANY_PUBLIC_PROFILE_REQUESTS_SUCCESS,
    profiles: profiles
  }
}

const fetchManyPublicProfileRequestsFail = (error) => {
  return {
    type: actionTypes.FETCH_MANY_PUBLIC_PROFILE_REQUESTS_FAIL,
    error: error
  }
}

export const fetchManyPublicProfilesAttempt = (authToken, publicProfileKeys= [], type) => {
  return dispatch => {
    let init;
    let success;
    let fail;
    if (type && type === 'REQUESTS') {
      init = fetchManyPublicProfileRequestsInit;
      success = fetchManyPublicProfileRequestsSuccess;
      fail = fetchManyPublicProfileRequestsFail;
    } else {
      init = fetchManyPublicProfilesInit;
      success = fetchManyPublicProfilesSuccess;
      fail = fetchManyPublicProfilesFail;
    }
    dispatch(init())
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
          dispatch(success(profiles));
        })
        .catch(error => {
          dispatch(fail(error));
        })
  }
}

export const clearProfileSummary = () => {
  return {
    type: actionTypes.CLEAR_PROFILE_SUMMARY
  }
}

export const clearPublicProfile = () => {
  return {
    type: actionTypes.CLEAR_PUBLIC_PROFILE
  }
}

export const clearManyProfiles = () => {
  return {
    type: actionTypes.CLEAR_MANY_PROFILES
  }
}


export const logoutClearUsers = () => {
  return {
    type: actionTypes.LOGOUT_CLEAR_USERS
  }
}