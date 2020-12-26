
import * as actionTypes from "./actionTypes";
import {KeyGenerator} from "../../shared/utility";
import axios from "../../axios/db-axios-instance";
import {sendFriendRequestAttempt} from "./friends";

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

export const editPageAboutAttempt = (authToken, newPage) => {
    return dispatch => {
        dispatch(editPageAboutInit())
        axios.put(`/pages/${newPage.dbKey}.json?auth=${authToken}`, newPage)
            .then(response => {
                console.log('SUCCESS - put new page');
                dispatch(editPageAboutSuccess(newPage));
            })
            .catch(error => {
                console.log(error);
                dispatch(editPageAboutFail(error));
            })
    }
}

const editPageCoverInit = () => {
    return {
        type: actionTypes.EDIT_PAGE_COVER_INIT
    }
}

const editPageCoverSuccess = (page) => {
    return {
        type: actionTypes.EDIT_PAGE_COVER_SUCCESS,
        page: page
    }
}

const editPageCoverFail = (error) => {
    return {
        type: actionTypes.EDIT_PAGE_COVER_FAIL,
        error: error
    }
}

const editPageProfilePicInit = () => {
    return {
        type: actionTypes.EDIT_PAGE_PROFILE_PIC_INIT
    }
}

const editPageProfilePicSuccess = (page) => {
    return {
        type: actionTypes.EDIT_PAGE_PROFILE_PIC_SUCCESS,
        page: page
    }
}

const editPageProfilePicFail = (error) => {
    return {
        type: actionTypes.EDIT_PAGE_PROFILE_PIC_FAIL,
        error: error
    }
}

export const editPageImageAttempt = (authToken, field, newPage) => {
    return dispatch => {
        let init;
        let success;
        let fail;
        if (field === 'profileImage') {
            init = editPageProfilePicInit;
            success = editPageProfilePicSuccess
            fail = editPageProfilePicFail
        } else {
            init = editPageCoverInit
            success = editPageCoverSuccess
            fail = editPageCoverFail
        }
        dispatch(init());
        axios.put(`/pages/${newPage.dbKey}.json?auth=${authToken}`, newPage)
            .then(response => {
                console.log(`SUCCESS - put new ${field}`)
                dispatch(success(newPage));
            })
            .catch(error => {
                dispatch(fail(error));
            })
    }
}

const requestPageLikeInit = () => {
    return {
        type: actionTypes.REQUEST_PAGE_LIKE_INIT
    }
}

const requestPageLikeSuccess = (page) => {
    return {
        type: actionTypes.REQUEST_PAGE_LIKE_SUCCESS,
        page: page
    }
}

const requestPageLikeFail = (error) => {
    return {
        type: actionTypes.REQUEST_PAGE_LIKE_FAIL,
        error: error
    }
}

export const requestPageLikeAttempt = ( authToken, newPage, recipientKey ) => {
    const newLikeRequest = {type: 'PAGE', dbKey: newPage.dbKey, name: newPage.name, category: newPage.category, profileImage: newPage.profileImage, sender: newPage.adminName, senderPublicKey: newPage.adminPublicProfileKey, senderUserKey: newPage.adminUserKey }
    return dispatch => {
        dispatch(requestPageLikeInit());
        axios.get(`/public-profiles/${recipientKey}.json?auth=${authToken}`)
            .then(response => {
                console.log('SUCCESS - get recipient profile -', response.data);

                const newPublicProfile = {...response.data};
                let newLikeRequests
                let newReceivedRequests;
                if (newPublicProfile.likeRequests) {
                    newLikeRequests = {...newPublicProfile.likeRequests}
                    if (newLikeRequests.received) {
                        newReceivedRequests = [...newLikeRequests.received, newLikeRequest]
                    } else {
                        newReceivedRequests = [newLikeRequest]
                    }
                    newLikeRequests.received = newReceivedRequests;
                    newPublicProfile.likeRequests = newLikeRequests;
                } else {
                    newPublicProfile.likeRequests = {received: [newLikeRequest]}
                }

                return axios.put(`/public-profiles/${recipientKey}.json?auth=${authToken}`, newPublicProfile)
            })
            .then(response => {
                console.log('SUCCESS - put new recipient profile - ');

                return axios.put(`/pages/${newPage.dbKey}.json?auth=${authToken}`, newPage)
            })
            .then(response => {
                console.log('SUCCESS - put new Page - ');
                dispatch(requestPageLikeSuccess(newPage))
            })
            .catch(error => {
                console.log('FAIL - somewhere - ', error);
                dispatch(requestPageLikeFail(error))
            })
    }

}

export const clearPageInProgress = () => {
    return {
        type: actionTypes.CLEAR_PAGE_IN_PROGRESS
    }
}

