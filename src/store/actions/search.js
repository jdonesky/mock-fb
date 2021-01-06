
import * as actionTypes from './actionTypes';
import axios from '../../axios/db-axios-instance';

const searchAllInit = () => {
    return {
        type: actionTypes.SEARCH_ALL_INIT
    }
}

const searchAllSuccess = (results) => {
    return {
        type: actionTypes.SEARCH_ALL_SUCCESS,
        results: results
    }
}

const searchAllFail = (error) => {
    return {
        type: actionTypes.SEARCH_ALL_FAIL,
        error: error
    }
}

export const searchAllAttempt = (authToken, searchPhrase) => {
    let results;
    return dispatch => {
        dispatch(searchAllInit());
        axios.get(`/users/`)
    }
}