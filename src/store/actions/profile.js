import * as actionTypes from '../actions/actionTypes'


export const storeProfileData = (formData) => {
  return {
    type: actionTypes.STORE_PROFILE_DATA,
    formData: formData
  }
}

