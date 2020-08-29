import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profileImage: null,
  name: null,
  age: null,
  location: null,
  status: null
};

const storeProfileData = (state, action) => {
  return {
    ...state,
    profileImage: action.formData.uploadedImage,
    name: action.formData.name,
    age: action.formData.age,
    location: action.formData.location,
  };
}; 

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_PROFILE_DATA: return storeProfileData(state,action);
    default:
      return state;
  }
};

export default reducer;
