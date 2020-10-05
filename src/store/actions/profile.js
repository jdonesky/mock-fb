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

// export const storeProfileAttempt = (userProfile, authToken) => {
//   return (dispatch) => {
//     dispatch(updateProfileInit());
//     const fetchFirebaseKeyParams =
//       "?auth=" +
//       authToken +
//       '&orderBy="userId"&equalTo="' +
//       userProfile.userId +
//       '"';
//     axios.get("/users.json" + fetchFirebaseKeyParams).then((response) => {
//       let matchingKey = Object.keys(response.data).map((key) => {
//         return key;
//       });
//       console.log(matchingKey[0]);
//       matchingKey = matchingKey[0]
//       console.log(matchingKey)
//       if (matchingKey) {
//         const patchParams = `/${matchingKey[0]}.json/?auth=${authToken}`;
//         // const deleteParams = `/${matchingKey}.json/?auth=${authToken}`;
//         // axios.delete("/users" + deleteParams).then((response) => {
//         axios
//           .patch("/users" + patchParams, userProfile)
//           .then((response) => {
//             dispatch(storeProfileSuccess(userProfile));
//           })
//           .catch((error) => {
//             dispatch(storeProfileFail(error));
//           });
//       }
//     });
//   };
// };

export const storeProfileAttempt = (userProfile, authToken) => {
  return (dispatch) => {
    dispatch(updateProfileInit());
    const postParams = `?auth=${authToken}`;
    const fetchFirebaseKeyParams =
      "?auth=" +
      authToken +
      '&orderBy="userId"&equalTo="' +
      userProfile.userId +
      '"';
    axios.get("/users.json" + fetchFirebaseKeyParams).then((response) => {
      const matchingKey = Object.keys(response.data).map((key) => {
        return key;
      });
      console.log(matchingKey)
      console.log(matchingKey[0]);
      if (matchingKey[0]) {
        const deleteParams = `/${matchingKey[0]}.json/?auth=${authToken}`;
        axios.delete("/users" + deleteParams).then((response) => {
          // axios
          //   .delete("/users.json" + postParams, {
          //     users: { id: matchingKey[0] },
          //   })
          //   .then((response) => {
          axios
            .post("/users.json" + postParams, userProfile)
            .then((response) => {
              dispatch(storeProfileSuccess(userProfile));
            })
            .catch((err) => {
              dispatch(storeProfileFail(err));
            });
        });
      } else {
        axios
          .post("/users.json" + postParams, userProfile)
          .then((response) => {
            dispatch(storeProfileSuccess(userProfile));
          })
          .catch((err) => {
            dispatch(storeProfileFail(err));
          });
      }
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
    console.log("/users.json" + queryParams)
    axios
      .get("/users.json" + queryParams)
      .then((response) => {
        const userData = Object.keys(response.data).map((key) => {
          return { key: key, ...response.data[key] };
        });
        dispatch(fetchProfileSuccess(userData[0]));
      })
      .catch((err) => {
        console.log(err);
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

