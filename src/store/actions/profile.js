import * as actionTypes from '../actions/actionTypes'


export const storeProfilePic = (imgURL) => {
  return {
    type: actionTypes.STORE_PROFILE_PIC,
    imgURL: imgURL
  }
}

