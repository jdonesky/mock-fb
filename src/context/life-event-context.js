
import React, {useState} from 'react';
import {connect} from 'react-redux'
import * as actions from "../store/actions";

export const LifeEventContext = React.createContext({
    category: null,
    title: null,
    description: null,
    date: null,
    passData: () => {},
    showModal: false,
    toggleModal: () => {},
})

const LifeEventContextProvider = (props) => {
    const [showModal, setShowModal] = useState(true);
    const [category, setCategory] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [date, setDate] = useState(null);

    const toggleModal = () => {
        setShowModal((prevState) => {
            return !prevState;
        })
    }

    const passData = () => {

    }

    return (
        <LifeEventContext.Provider value={{ passData: passData, showModal: showModal, toggleModal: toggleModal, category: category, title: title, description: description, date: date }}>
            {props.children}
        </LifeEventContext.Provider>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken, firebaseKey, fieldName, payload, how, id) => dispatch(actions.updateProfileAttempt(authToken, firebaseKey, fieldName, payload, how, id))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LifeEventContextProvider);
