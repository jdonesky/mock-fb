
import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/db-axios-instance";
import {KeyGenerator} from "../../shared/utility";


const loadProfileInit = () => {
    return {
        type: actionTypes.LOAD_PROFILE_INIT
    }
}

const updateProfileInit = () => {
  return {
    type: actionTypes.UPDATE_PROFILE_INIT,
  };
};


export const createProfileAttempt =  (token,newUserData) => {
  return dispatch => {
    dispatch(loadProfileInit());
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

export const fetchProfileAttempt = (userId, token) => {
  return (dispatch) => {
    dispatch(loadProfileInit());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
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


export const updateProfileAttempt = (authToken, firebaseKey, fieldName, payload, how, id) => {
  return dispatch => {
    dispatch(updateProfileInit());
    let updatedUserProfile;
    const url = `/users/${firebaseKey}.json?auth=${authToken}`
    axios.get(url)
        .then(response => {
          KeyGenerator.getKey(authToken, (newKey) => {
              switch (how) {
                  case "edit":
                      if (fieldName === 'occupations' || fieldName === 'education' || fieldName === 'relationships' || fieldName === 'family' || fieldName === 'pastLocations' || fieldName === 'posts') {
                          if (response.data[fieldName]) {
                              const updatedArray = [...response.data[fieldName]];
                              const itemIndex = updatedArray.findIndex(item => item.id === id);
                              updatedArray[itemIndex] = {...payload, id: newKey};
                              updatedUserProfile = {...response.data, [fieldName]: updatedArray};
                          } else {
                              if (typeof (payload) === 'object') {
                                  updatedUserProfile = {
                                      ...response.data,
                                      [fieldName]: [{...payload, id: newKey}]
                                  }
                              } else {
                                  updatedUserProfile = {
                                      ...response.data,
                                      [fieldName]: [{payload, id: newKey}]
                                  }
                              }
                          }
                      } else if (fieldName === 'email' || fieldName === 'phone') {
                          const updatedContacts = {...response.data['contacts'], [fieldName] : payload}
                          updatedUserProfile = {...response.data, contacts: updatedContacts}
                      } else {
                          updatedUserProfile = {...response.data, [fieldName]: payload};
                      }
                      break;
                  case "add":
                      if (fieldName === 'occupations' || fieldName === 'education' || fieldName === 'relationships' || fieldName === 'family' || fieldName === 'pastLocations' || fieldName === 'lifeEvents' || fieldName === 'posts') {
                          if (response.data[fieldName]) {
                              updatedUserProfile = {
                                  ...response.data,
                                  [fieldName]: [...response.data[fieldName], {...payload, id: newKey}]
                              }
                          } else {
                              updatedUserProfile = {
                                  ...response.data,
                                  [fieldName]: [{...payload, id: newKey}]
                              }
                          }
                      } else if (fieldName === 'email' || fieldName === 'phone') {
                          const updatedContacts = {...response.data['contacts'], [fieldName] : payload}
                          updatedUserProfile = {...response.data, contacts: updatedContacts}
                      } else {
                          updatedUserProfile = {...response.data, [fieldName]: payload};
                      }
                      break;
                  case "delete":
                      if (fieldName === 'occupations' || fieldName === 'education' || fieldName === 'relationships' || fieldName === 'family' || fieldName === 'pastLocations') {
                          if (!response.data[fieldName]) {
                              return;
                          } else {
                              const updatedArray = [...response.data[fieldName]];
                              const deleteIndex = updatedArray.findIndex(item => item.id === id);
                              updatedArray.splice(deleteIndex, 1);
                              updatedUserProfile = {...response.data, [fieldName]: updatedArray}
                          }
                      } else if (fieldName === 'email' || fieldName === 'phone') {
                          const updatedContacts = {...response.data['contacts'], [fieldName] : null}
                          updatedUserProfile = {...response.data, contacts: updatedContacts}
                      } else {
                          console.log('deleting single entry field')
                          updatedUserProfile = {...response.data, [fieldName]: null}
                      }
                      break;
                  default:
                      throw new Error("Shouldn't be here!")
              }
          axios.put(url, updatedUserProfile)
            .then(response => {
              console.log('PUT REQ RESPONSE', response)
              dispatch(updateProfileSuccess(updatedUserProfile))
            })
              .catch(err => console.log(err))
          })
        })
        .catch(error => {
          console.log(error)
          dispatch(updateProfileFail(error));
        })
  }
}


const updateProfileSuccess = (userData) => {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    userData: userData,
  };
};

// ------------------------

const updateProfileFail = (error) => {
  return {
    type: actionTypes.UPDATE_PROFILE_FAIL,
    error: error,
  };
};


// const statusUpdateInit = () => {
//   return {
//     type: actionTypes.STATUS_UPDATE_INIT,
//   };
// };
//
// const statusUpdateSuccess = (status) => {
//   return {
//     type: actionTypes.STATUS_UPDATE_SUCCESS,
//     status: status,
//   };
// };
//
// const statusUpdateFail = (error) => {
//   return {
//     type: actionTypes.STATUS_UPDATE_FAIL,
//     error: error,
//   };
// };
//
// export const statusUpdateAttempt = (authToken, statusInfo) => {
//   return (dispatch) => {
//     dispatch(statusUpdateInit());
//     axios
//       .post("/posts.json?auth=" + authToken, statusInfo)
//       .then(() => {
//         dispatch(statusUpdateSuccess(statusInfo.status));
//       })
//       .catch((error) => {
//         dispatch(statusUpdateFail(error));
//       });
//   };
// };

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