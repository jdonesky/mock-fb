
import * as actionTypes from './actionTypes';
import axios from '../../axios/db-axios-instance';

const startChatInit = () => {
    return {
        type: actionTypes.START_CHAT_INIT
    }
}

const startChatSuccess = (chat) => {
    return {
        type: actionTypes.START_CHAT_SUCCESS,
        chat: chat
    }
}

const startChatFail = (error) => {
    return {
        type: actionTypes.START_CHAT_FAIL,
        error: error
    }
}

export const startChatAttempt = (authToken, chat) => {
    return dispatch => {
        let chatKey;
        dispatch(startChatInit())
        axios.post(`/chats.json?auth=${authToken}`, chat)
            .then(response => {
                chatKey = response.data.name;
                const parties = [...chat.parties]
                let getQueries = [];
                parties.forEach(party => getQueries.push(axios.get`/public-profiles/${party.publicProfileKey}.json`))
            })
    }
}