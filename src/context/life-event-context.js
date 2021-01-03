
import React, {useState} from 'react';
import {connect} from 'react-redux'
import * as actions from "../store/actions";

export const LifeEventContext = React.createContext({
    category: null,
    showModal: false,
    modalContent: false,
    passData: () => {},
    toggleModal: () => {},
    cancelModal: () => {},
    toggleModalContent: () => {},
    saveEvent: () => {}
})

const LifeEventContextProvider = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState(null);
    const [modalContent, setModalContent] = useState(false);

    const toggleModal = () => {
        setShowModal((prevState) => {
            return !prevState;
        })
    }

    const cancelModal = () => {
        setShowModal(false);
        setModalContent(false);
    }

    const toggleModalContent = () => {
        setModalContent((prevState) => {
            return !prevState;
        })
    }

    const passData = (type,payload) => {
        switch (type) {
            case 'category':
                setCategory(payload)
                break;
            default:
                setCategory(null)
        }
    }

    const saveEvent = (payload) => {
        props.onProfileUpdate(props.authToken, props.firebaseKey, 'lifeEvents', payload, 'add')
    }

    return (
        <LifeEventContext.Provider value={{ saveEvent: saveEvent, passData: passData, showModal: showModal, toggleModal: toggleModal, cancelModal: cancelModal, modalContent: modalContent, toggleModalContent: toggleModalContent, category: category}}>
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
