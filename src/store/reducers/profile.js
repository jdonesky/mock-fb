import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profileImage: null,
};

const storeProfilePic = (state, action) => {
  return {
    ...state,
    profileImage: action.imgURL,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_PROFILE_PIC: return storeProfilePic(action, state);
  }
};

export default reducer
