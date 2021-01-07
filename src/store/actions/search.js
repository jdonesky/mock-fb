
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
    let keys;
    let results;
    return dispatch => {
        dispatch(searchAllInit());
        axios.get(`/users.json?auth=${authToken}&orderBy="firstName"&startAt="${searchPhrase[0].toUpperCase()}"&endAt="${searchPhrase[0].toUpperCase()}\uf8ff"`)
            .then(response => {
                if (response.data && Object.keys(response.data).length) {
                    results = Object.keys(response.data).map(key => ({...response.data[key], matched: 'user'}))
                }
                return axios.get(`/users.json?auth=${authToken}&orderBy="firstName"&startAt="${searchPhrase[0].toLowerCase()}"&endAt="${searchPhrase[0].toLowerCase()}\uf8ff"`)
            })
            .then(response => {
                if (response.data && Object.keys(response.data).length) {
                    if (results) {
                        keys = results.map(res => res.userKey)
                        results = [...results, ...Object.keys(response.data).map(key => ({...response.data[key], matched: 'user'})).filter(res => !keys.includes(res.userKey) )]
                    } else {
                        results = Object.keys(response.data).map(key => ({...response.data[key], matched: 'user'}))
                    }
                }
                return axios.get(`/users.json?auth=${authToken}&orderBy="lastName"&startAt="${searchPhrase[0].toUpperCase()}"&endAt="${searchPhrase[0].toUpperCase()}\uf8ff"`)
            })
            .then(response => {
                if (response.data && Object.keys(response.data).length) {
                    if (results) {
                        keys = results.map(res => res.userKey)
                        results = [...results, ...Object.keys(response.data).map(key => ({...response.data[key], matched: 'user'})).filter(res => !keys.includes(res.userKey) )]
                    } else {
                        results = Object.keys(response.data).map(key => ({...response.data[key], matched: 'user'}))
                    }
                }
                return axios.get(`/users.json?auth=${authToken}&orderBy="lastName"&startAt="${searchPhrase[0].toLowerCase()}"&endAt="${searchPhrase[0].toLowerCase()}\uf8ff"`)
            })
            .then(response => {
                if (response.data && Object.keys(response.data).length) {
                    if (results) {
                        keys = results.map(res => res.userKey)
                        results = [...results, ...Object.keys(response.data).map(key => ({...response.data[key], matched: 'user'})).filter(res => !keys.includes(res.userKey) )]
                    } else {
                        results = Object.keys(response.data).map(key => ({...response.data[key], matched: 'user'}))
                    }
                }
                return axios.get(`/pages.json?auth=${authToken}&orderBy="name"&startAt="${searchPhrase[0].toUpperCase()}"&endAt="${searchPhrase[0].toUpperCase()}\uf8ff"`)
            })
            .then(response => {
                if (response.data && Object.keys(response.data).length) {
                    if (results) {
                        results = [...results, ...Object.keys(response.data).map(key => ({...response.data[key], matched: 'page'}))]
                    } else {
                        results = Object.keys(response.data).map(key => ({...response.data[key], matched: 'page'}))
                    }
                }
                return axios.get(`/pages.json?auth=${authToken}&orderBy="name"&startAt="${searchPhrase[0].toLowerCase()}"&endAt="${searchPhrase[0].toLowerCase()}\uf8ff"`)
            })
            .then(response => {
                if (response.data && Object.keys(response.data).length) {
                    if (results) {
                        keys = results.map(res => res.dbKey)
                        results = [...results, ...Object.keys(response.data).map(key => ({
                            ...response.data[key],
                            matched: 'page'
                        })).filter(res => !keys.includes(res.dbKey))]
                    } else {
                        results = Object.keys(response.data).map(key => ({...response.data[key], matched: 'page'}))
                    }
                }
            })
            .then(response => {
                dispatch(searchAllSuccess(results));
            })
            .catch(error => {
                dispatch(searchAllFail(error));
            })
    }
}

export const clearSearchResults = () => {
    return {
        type: actionTypes.CLEAR_SEARCH_RESULTS
    }
}