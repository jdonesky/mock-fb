
import * as actionTypes from "./actionTypes";
import * as actions from './index';
import {convertDatetime, KeyGenerator} from "../../shared/utility";
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
        let postsKey;
        let pageKey;
        let postsWithKeys;
        dispatch(createPageInit());
        KeyGenerator.getKey(authToken, (newKey) => {
            let newPage = {...page, id: newKey}
            const today = new Date();
            let yesterday = new Date();
            yesterday = new Date(yesterday.setDate(today.getDate() - 1));
            const posts = [{userType: 'PAGE', name: newPage.name, text: 'hold postsKey', date: yesterday, id: -1 },{userType: 'PAGE', name: newPage.name,text: `${newPage.name} was created ${convertDatetime(today, true)}`, date: today, id: newKey}]
            axios.post(`/posts.json?auth=${authToken}`,posts)
                .then(response => {
                    postsKey = response.data.name;
                    postsWithKeys = posts.map(post => ({...post, postsKey: postsKey}))
                    return axios.put(`/posts/${postsKey}.json?auth=${authToken}`, [...postsWithKeys])
                })
                .then(response => {
                    newPage = {...newPage, postsKey: postsKey}
                    return axios.post(`/pages.json?auth=${authToken}`, newPage)
                })
                .then(response => {
                    pageKey = response.data.name;
                    newPage = {...newPage, dbKey: pageKey}
                    return axios.put(`/pages/${response.data.name}.json?auth=${authToken}`, newPage)
                })
                .then(response => {
                    postsWithKeys = postsWithKeys.map(post => ({...post, userKey: pageKey}))
                    return axios.put(`/posts/${postsKey}.json?auth=${authToken}`, [...postsWithKeys])
                })
                .then(response => {
                    return axios.get(`/users/${page.adminUserKey}.json?auth=${authToken}`)
                })
                .then(response => {
                    console.log('SUCCESS - got profile to add new page key')
                    const newProfile = {...response.data}
                    let newPageKeys;
                    if (newProfile.ownedPageKeys) {
                        newPageKeys = [...newProfile.ownedPageKeys, pageKey]
                    } else {
                        newPageKeys = [pageKey]
                    }
                    newProfile.ownedPageKeys = newPageKeys;
                    return axios.put(`/users/${page.adminUserKey}.json?auth=${authToken}`, newProfile)
                })
                .then(response => {
                    console.log('Success - put new profile with new page key')
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
        if (page.profileImage) {
            axios.get(`/posts/${page.postsKey}.json?auth=${authToken}`)
                .then(response => {
                    const postsWithProfilePics = response.data.map(post => ({...post, profileImage: page.profileImage}))
                    return axios.put(`/posts/${page.postsKey}.json?auth=${authToken}`, postsWithProfilePics)
                })
                .catch(error => {
                    console.log(error);
                })
        }
        axios.put(`pages/${pageKey}.json?auth=${authToken}`, page)
            .then(response => {
                dispatch(finishCreatePageSuccess());
                cb();
            })
            .catch(error => {
                dispatch(createPageFail(error));
            })

    }
}

const fetchOwnedPageKeysInit = () => {
    return {
        type: actionTypes.FETCH_OWNED_PAGE_KEYS_INIT
    }
}

const fetchOwnedPageKeysSuccess = (pageKeys) => {
    return {
        type: actionTypes.FETCH_OWNED_PAGE_KEYS_SUCCESS,
        pageKeys: pageKeys
    }
}

const fetchOwnedPageKeysFail = (error) => {
    return {
        type: actionTypes.FETCH_OWNED_PAGE_KEYS_FAIL,
        error: error
    }
}

export const fetchOwnedPageKeysAttempt = (authToken, userKey) => {
    return dispatch => {
        dispatch(fetchOwnedPageKeysInit());
        axios.get(`/users/${userKey}.json?auth=${authToken}`)
            .then(response => {
                let ownedPageKeys;
                if (response.data) {
                    ownedPageKeys = response.data.ownedPageKeys;
                }
                dispatch(fetchOwnedPageKeysSuccess(ownedPageKeys));
            })
            .catch(error => {
                dispatch(fetchOwnedPageKeysFail(error));
            })
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


const fetchOthersPageInit = () => {
    return {
        type: actionTypes.FETCH_OTHERS_PAGE_INIT
    }
}

const fetchOthersPageSuccess = (page) => {
    return {
        type: actionTypes.FETCH_OTHERS_PAGE_SUCCESS,
        page: page
    }
}

const fetchOthersPageFail = (error) => {
    return {
        type: actionTypes.FETCH_OTHERS_PAGE_FAIL,
        error: error
    }
}

export const fetchOthersPageAttempt = (authToken, pageKey) => {
    return dispatch => {
        dispatch(fetchOthersPageInit());
        axios.get(`/pages/${pageKey}.json?auth=${authToken}`)
            .then(response => {
                dispatch(fetchOthersPageSuccess(response.data))
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOthersPageFail(error))
            })
    }
}



const fetchPageSummaryInit = () => {
    return {
        type: actionTypes.FETCH_PAGE_SUMMARY_INIT
    }
}

const fetchPageSummarySuccess = (page) => {
    return {
        type: actionTypes.FETCH_PAGE_SUMMARY_SUCCESS,
        page: page
    }
}

const fetchPageSummaryFail = (error) => {
    return {
        type: actionTypes.FETCH_PAGE_SUMMARY_FAIL,
        error: error
    }
}

export const fetchPageSummaryAttempt = (authToken, pageKey) => {
    return dispatch => {
        dispatch(fetchPageSummaryInit());
        axios.get(`/pages/${pageKey}.json?auth=${authToken}`)
            .then(response => {
                console.log(response.data)
                dispatch(fetchPageSummarySuccess(response.data))
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchPageSummaryFail(error))
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
                if (field === 'profileImage') {
                    return axios.get(`/posts/${newPage.postsKey}.json?auth=${authToken}`)
                }
            })
            .then(response => {
                const postsWithNewProfilePics = response.data.map(post => ({...post, profileImage: newPage.profileImage}))
                return axios.put(`/posts/${newPage.postsKey}.json?auth=${authToken}`, postsWithNewProfilePics)
            })
            .then(response => {
                console.log('added new profile pic to posts')
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

const likePageInit = () => {
    return {
        type: actionTypes.LIKE_PAGE_INIT
    }
}

const likePageSuccess = (likedPages) => {
    return {
        type: actionTypes.LIKE_PAGE_SUCCESS,
        likedPages: likedPages
    }
}

const likePageFail = (error) => {
    return {
        type: actionTypes.LIKE_PAGE_FAIL,
        error: error
    }
}

export const likePageAttempt = (authToken, newPage, newProfile, profileKey) => {
    return dispatch => {
        dispatch(likePageInit());
        axios.put(`/pages/${newPage.dbKey}.json?auth=${authToken}`, newPage)
            .then(response => {
                console.log('success - put new page');
                return axios.put(`/public-profiles/${profileKey}.json?auth=${authToken}`, newProfile)
            })
            .then(response => {
                console.log('success - put new profile');
                dispatch(likePageSuccess());
                dispatch(actions.likePageSuccessFeedback(newProfile))
            })
            .catch(error => {
                console.log(error);
                dispatch(likePageFail(error));
            })
    }
}


const cancelLikeInit = () => {
    return {
        type: actionTypes.CANCEL_LIKE_INIT
    }
}

const cancelLikeSuccess = (likedPages) => {
    return {
        type: actionTypes.CANCEL_LIKE_SUCCESS,
        likedPages: likedPages
    }
}

const cancelLikeFail = (error) => {
    return {
        type: actionTypes.CANCEL_LIKE_FAIL,
        error: error
    }
}

export const cancelLikeAttempt = (authToken, newPage, newProfile, profileKey) => {
    return dispatch => {
        dispatch(likePageInit());
        axios.put(`/pages/${newPage.dbKey}.json?auth=${authToken}`, newPage)
            .then(response => {
                console.log('success - put new page');
                return axios.put(`/public-profiles/${profileKey}.json?auth=${authToken}`, newProfile)
            })
            .then(response => {
                console.log('success - put new profile');
                dispatch(likePageSuccess());
                dispatch(actions.likePageSuccessFeedback(newProfile))
            })
            .catch(error => {
                console.log(error);
                dispatch(likePageFail(error));
            })
    }
}

const switchPageAvailabilityInit = () => {
    return {
        type: actionTypes.SWITCH_PAGE_AVAILABILITY_INIT
    }
}

const switchPageAvailabilitySuccess = () => {
    return {
        type: actionTypes.SWITCH_PAGE_AVAILABILITY_SUCCESS
    }
}

const switchPageAvailabilityFail = (error) => {
    return {
        type: actionTypes.SWITCH_PAGE_AVAILABILITY_FAIL,
        error: error
    }
}

export const switchPageAvailability = (authToken, pageKey, newStatus) => {
    return dispatch => {
        dispatch(switchPageAvailabilityInit())
        axios.patch(`/pages/${pageKey}/isOnline.json?auth=${authToken}`, newStatus)
            .then(response => {
                console.log('success -')
                dispatch(switchPageAvailabilitySuccess());
            })
            .catch(error => {
                dispatch(switchPageAvailabilityFail(error));
            })
    }
}


export const clearPageSummary = () => {
    return {
        type: actionTypes.CLEAR_PAGE_SUMMARY
    }
}

export const clearPageInProgress = () => {
    return {
        type: actionTypes.CLEAR_PAGE_IN_PROGRESS
    }
}

