
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


const fetchOwnedPagesInit = () => {
    return {
        type: actionTypes.FETCH_OWNED_PAGES_INIT
    }
}

const fetchOwnedPagesSuccess = (pages) => {
    return {
        type: actionTypes.FETCH_OWNED_PAGES_SUCCESS,
        pages: pages
    }
}

const fetchOwnedPagesFail = (error) => {
    return {
        type: actionTypes.FETCH_OWNED_PAGES_FAIL,
        error: error
    }
}

export const fetchOwnedPagesAttempt = (authToken, userKey) => {
    return dispatch => {
        dispatch(fetchOwnedPagesInit());
        axios.get(`pages.json?auth=${authToken}&orderBy="adminUserKey"&equalTo="${userKey}"`)
            .then(response => {
                dispatch(fetchOwnedPagesSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchOwnedPagesFail(error));
            })
    }
}

const fetchOwnedPageInit = () => {
    return {
        type: actionTypes.FETCH_OWNED_PAGE_INIT
    }
}

const fetchOwnedPageSuccess = (page) => {
    return {
        type: actionTypes.FETCH_OWNED_PAGE_SUCCESS,
        page: page
    }
}


const fetchOwnedPageFail = (error) => {
    return {
        type: actionTypes.FETCH_OWNED_PAGE_FAIL,
        error: error
    }
}

export const fetchOwnedPageAttempt = (authToken, pageKey) => {
    return dispatch => {
        dispatch(fetchOwnedPageInit())
        axios.get(`/pages/${pageKey}.json?auth=${authToken}`)
            .then(response => {
                dispatch(fetchOwnedPageSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOwnedPageFail(error));
            })
    }
}

const editPageAboutInit = () => {
    return {
        type: actionTypes.EDIT_PAGE_ABOUT_INIT
    }
}

const editPageAboutSuccess = (page) => {
    return {
        type: actionTypes.EDIT_PAGE_ABOUT_SUCCESS,
        page: page
    }
}

const editPageAboutFail = (error) => {
    return {
        type: actionTypes.EDIT_PAGE_ABOUT_FAIL,
        error: error
    }
}

export const editPageAboutAttempt = (authToken, newPage, cb) => {
    return dispatch => {
        dispatch(editPageAboutInit())
        axios.put(`/pages/${newPage.dbKey}.json?auth=${authToken}`, newPage)
            .then(response => {
                console.log('SUCCESS - put new page');
                dispatch(editPageAboutSuccess(newPage));
                cb();
            })
            .catch(error => {
                console.log(error);
                dispatch(editPageAboutFail(error));
            })
    }
}


export const clearPageInProgress = () => {
    return {
        type: actionTypes.CLEAR_PAGE_IN_PROGRESS
    }
}

