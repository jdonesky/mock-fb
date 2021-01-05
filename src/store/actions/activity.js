
import * as actionTypes from './actionTypes';
import axios from '../../axios/db-axios-instance';

const fetchNewActivityInit = () => {
    return {
        type: actionTypes.FETCH_NEW_ACTIVITY_INIT
    }
}

const fetchNewActivitySuccess = (records) => {
    return {
        type: actionTypes.FETCH_NEW_ACTIVITY_SUCCESS,
        newActivity: records
    }
}

const fetchNewActivityFail = (error) => {
    return {
        type: actionTypes.FETCH_NEW_ACTIVITY_FAIL,
        error: error
    }
}

export const fetchNewActivityRecordAttempt = (authToken,key) => {
    return dispatch => {
        dispatch(fetchNewActivityInit());

        axios.get(`/activity/${key}/records.json?auth=${authToken}&orderBy="read"&equalTo="false"`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
}