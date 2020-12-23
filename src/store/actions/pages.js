
import * as actionTypes from "./actionTypes";
import {KeyGenerator} from "../../shared/utility";
import axios from "../../axios/db-axios-instance";

const createPageInit = () => {
    return {
        type: actionTypes.CREATE_PAGE_INIT
    }
}

const startCreatePageSuccess = (page) => {
    return {
        type: actionTypes.START_CREATE_PAGE_SUCCESS,
        page: page
    }
}


const finishCreatePageSuccess = (page) => {
    return {
        type: actionTypes.FINISH_CREATE_PAGE_SUCCESS,
        page: page
    }
}

const createPageFail = (error) => {
    return {
        type: actionTypes.CREATE_PAGE_FAIL,
        error: error
    }
}

export const startCreatePageAttempt = (authToken, page) => {
    return dispatch => {
        dispatch(createPageInit());
        KeyGenerator.getKey(authToken, (newKey) => {
            let newPage = {...page, id: newKey}
            axios.post(`/pages.json?auth=${authToken}`, newPage)
                .then(response => {
                    newPage = {...newPage, dbKey: response.data.name}
                    return axios.put(`/pages/${response.data.name}.json?auth=${authToken}`, newPage)
                })
                .then(response => {
                    dispatch(startCreatePageSuccess(newPage))
                })
                .catch(error => {
                    console.log(error)
                    dispatch(createPageFail(error))
                })
        })
    }
}

export const finishCreatePageAttempt = (authToken, page, cb) => {
    return dispatch => {
        dispatch(createPageInit())
        const pageKey = page.dbKey
        console.log(pageKey);
        if (pageKey) {
            axios.put(`pages/${pageKey}.json?auth=${authToken}`, page)
                .then(response => {
                    dispatch(finishCreatePageSuccess())
                    cb();
                })
                .catch(error => {
                    dispatch(createPageFail(error));
                })
        }
    }
}


const fetchMyPagesInit = () => {
    return {
        type: actionTypes.FETCH_MY_PAGES_INIT
    }
}

const fetchMyPagesSuccess = (pages) => {
    return {
        type: actionTypes.FETCH_MY_PAGES_SUCCESS,
        pages: pages
    }
}

const fetchMyPagesFail = (error) => {
    return {
        type: actionTypes.FETCH_MY_PAGES_FAIL,
        error: error
    }
}

export const fetchMyPagesAttempt = (authToken, userKey) => {
    return dispatch => {
        dispatch(fetchMyPagesInit());
        console.log('userKey', userKey);
        axios.get(`pages.json?auth=${authToken}&orderBy="adminUserKey"&equalTo="${userKey}"`)
            .then(response => {
                console.log('SUCCESS - fetched my pages', response.data);
                dispatch(fetchMyPagesSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchMyPagesFail(error));
            })
    }
}

// export const fetchOtherPageAttempt = () => {
//     return dispatch => {
//         dispatch(fetch)
//     }
// }

export const clearPageInProgress = () => {
    return {
        type: actionTypes.CLEAR_PAGE_IN_PROGRESS
    }
}

