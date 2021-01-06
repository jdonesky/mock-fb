
import * as actionTypes from './actionTypes';
import axios from '../../axios/db-axios-instance';
import {getElapsedTime} from "../../shared/utility";

const fetchNewActivityInit = () => {
    return {
        type: actionTypes.FETCH_NEW_ACTIVITY_INIT
    }
}

const fetchNewActivitySuccess = (records) => {
    return {
        type: actionTypes.FETCH_NEW_ACTIVITY_SUCCESS,
        records: records
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
        let results;
        let today = new Date()
        let weekAgo = new Date();
        weekAgo = new Date(weekAgo.setDate(today.getDate() - 7)).getTime()
        dispatch(fetchNewActivityInit());
        axios.get(`/activity/${key}/records.json?auth=${authToken}&orderBy="read"&equalTo="false"`)
            .then(response => {
                if (Object.keys(response.data).length) {
                    results = response.data
                }
                return axios.get(`/activity/${key}/records.json?auth=${authToken}&orderBy="sortDate"&startAt=${weekAgo}`)
            })
            .then(response => {
                if (results) {
                    if (Object.keys(response.data).length) {
                        results = {...results, ...response.data}
                    }
                } else {
                    if (Object.keys(response.data).length) {
                        results = response.data
                    }
                }
                dispatch(fetchNewActivitySuccess(results))
            })
            .catch(error => {
                dispatch(fetchNewActivityFail(error))
            })
    }
}

const switchReadStatusInit = (id) => {
    return {
        type: actionTypes.SWITCH_READ_STATUS_INIT,
        id: id
    }
}

const switchReadStatusSuccess = () => {
    return {
        type: actionTypes.SWITCH_READ_STATUS_SUCCESS,
    }
}

const switchReadStatusFail = (error) => {
    return {
        type: actionTypes.SWITCH_READ_STATUS_FAIL,
        error: error
    }
}

export const switchReadStatusAttempt = (authToken, logKey, recordKey, modifiedRecord) => {
    return dispatch => {
        dispatch(switchReadStatusInit())
        axios.put(`/activity/${logKey}/records/${recordKey}.json?auth=${authToken}`, modifiedRecord)
            .then(response => {
                console.log('success - modified read status')
                dispatch(switchReadStatusSuccess())
            })
            .catch(error => {
                console.log('failed - ', error)
                dispatch(switchReadStatusFail(error))
            })
    }
}

const createActivityInit = () => {
    return {
        type: actionTypes.CREATE_ACTIVITY_INIT
    }
}

const createActivitySuccess = () => {
    return {
        type: actionTypes.CREATE_ACTIVITY_SUCCESS
    }
}

const createActivityFail = (error) => {
    return {
        type: actionTypes.CREATE_ACTIVITY_FAIL
    }
}

export const createActivityAttempt = (authToken, logKey, activity, type) => {
    return dispatch => {
        dispatch(createActivityInit());
        let loc;
        if (type === 'PERSONAL') {
            loc = "personal"
        } else {
            loc = "records"
        }
        axios.post(`/activity/${logKey}/${loc}.json?auth=${authToken}`, activity)
            .then(response => {
                console.log('success, created new record');
                dispatch(createActivitySuccess());
            })
            .catch(error => {
                console.log('fail', error);
                dispatch(createActivityFail(error));
            })
    }
}

const deleteActivityInit = (id) => {
    return {
        type: actionTypes.DELETE_ACTIVITY_INIT,
        id: id
    }
}

const deleteActivitySuccess = () => {
    return {
        type: actionTypes.DELETE_ACTIVITY_SUCCESS,
    }
}

const deleteActivityFail = (error) => {
    return {
        type: actionTypes.DELETE_ACTIVITY_FAIL,
        error: error
    }
}

export const deleteActivityAttempt = (authToken, logKey, key) => {
    return dispatch => {
        dispatch(deleteActivityInit(key));
        axios.delete(`/activity/${logKey}/records/${key}.json?auth=${authToken}`)
            .then(response => {
                console.log('success - deleted activity')
                dispatch(deleteActivitySuccess());
            })
            .catch(error => {
                console.log('fail- ', error);
                dispatch(deleteActivityFail(error));
            })
    }
}