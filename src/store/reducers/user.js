import * as actionTypes from '../actions/actionTypes'


const initialState = {
    name: null,
    age: null,
    location: null,
    relationshipStatus: null,
    education: null,
    occupation: null,
    interests: [],
}

const reducer = ( state=initialState, action ) => {
    switch (action.type) {
        default: return state
    }
}

export default reducer