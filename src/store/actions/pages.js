
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
                    console.log('SUCCESS - put new page: ', response.data.name);
                    newPage = {...newPage, dbKey: response.data.name}
                    dispatch(startCreatePageSuccess(newPage))
                })
                .catch(error => {
                    console.log(error)
                    dispatch(createPageFail(error))
                })
        })
    }
}

export const finishCreatePageAttempt = (authToken, page) => {
    return dispatch => {
        dispatch(createPageInit())
    }
}