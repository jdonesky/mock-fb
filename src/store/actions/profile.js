
import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";



const updateProfileInit = () => {
  return {
    type: actionTypes.UPDATE_PROFILE_INIT,
  };
};


export const createProfileAttempt =  (token,newUserData) => {
  return dispatch => {
    dispatch(updateProfileInit());
    axios.post(`/users.json?auth=${token}`, newUserData)
        .then( response => {
          const userData= {key: response.data.name,...newUserData};
          dispatch(createProfileSuccess(userData));
        })
        .catch(error => {
          dispatch(updateProfileFail(error))
        })
  }
}

const createProfileSuccess = (userData) => {
  return {
    type: actionTypes.CREATE_PROFILE_SUCCESS,
    userData: userData
  }
}

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
        })[0]
        dispatch(fetchProfileSuccess(userData));
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateProfileFail(err));
      });
  };
};

const fetchProfileSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    userData: userData,
  };
};



const updateProfileSuccess = (userProfile) => {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    userProfile: userProfile,
  };
};


const updateProfileFail = (error) => {
  return {
    type: actionTypes.UPDATE_PROFILE_FAIL,
    error: error,
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


// export const updateProfileAttempt = (userProfile, authToken) => {
//   return (dispatch) => {
//     dispatch(updateProfileInit());
//     const postParams = `?auth=${authToken}`;
//     const fetchFirebaseKeyParams =
//       "?auth=" +
//       authToken +
//       '&orderBy="userId"&equalTo="' +
//       userProfile.userId +
//       '"';
//     axios.get("/users.json" + fetchFirebaseKeyParams).then((response) => {
//       const matchingKey = Object.keys(response.data).map((key) => {
//         return key;
//       });
//       console.log(matchingKey)
//       console.log(matchingKey[0]);
//       if (matchingKey[0]) {
//         const deleteParams = `/${matchingKey[0]}.json/?auth=${authToken}`;
//         axios.delete("/users" + deleteParams).then((response) => {
//           axios
//             .post("/users.json" + postParams, userProfile)
//             .then((response) => {
//               dispatch(updateProfileSuccess(userProfile));
//             })
//             .catch((err) => {
//               dispatch(updateProfileFail(err));
//             });
//         });
//       } else {
//         axios
//           .post("/users.json" + postParams, userProfile)
//           .then((response) => {
//             dispatch(updateProfileSuccess(userProfile));
//           })
//           .catch((err) => {
//             dispatch(updateProfileFail(err));
//           });
//       }
//     });
//   };
// };