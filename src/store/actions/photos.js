import * as actionTypes from './actionTypes';
import axios from '../../axios/db-axios-instance';

const fetchByMePhotosInit = () => {
    return {
        type: actionTypes.FETCH_BY_ME_PHOTOS_INIT
    }
}

const fetchByMePhotosSuccess = () => {
    return {
        type: actionTypes.FETCH_BY_ME_PHOTOS_SUCCESS
    }
}

const fetchByMePhotosFail = () => {
    return {
        type: actionTypes.FETCH_BY_ME_PHOTOS_FAIL
    }
}

export const fetchByMePhotosAttempt = (authToken, photosKey) => {
    return dispatch => {
        dispatch(fetchByMePhotosInit())

    }
}

const fetchTaggedMePhotosInit = () => {
    return {
        type: actionTypes.FETCH_BY_ME_PHOTOS_INIT
    }
}

const fetchTaggedMePhotosSuccess = () => {
    return {
        type: actionTypes.FETCH_BY_ME_PHOTOS_SUCCESS
    }
}

const fetchTaggedMePhotosFail = () => {
    return {
        type: actionTypes.FETCH_BY_ME_PHOTOS_FAIL
    }
}

export const fetchTaggedMePhotosAttempt = (authToken, photosKey) => {
    return dispatch => {
        dispatch(fetchByMePhotosInit())

    }
}

