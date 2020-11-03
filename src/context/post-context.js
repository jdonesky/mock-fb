
import React, {useState} from 'react';
import {connect} from 'react-redux'
import * as actions from "../store/actions";

export const PostContext = React.createContext({
    image: null,
    showModal: false,
    modalContent: false,
    passData: () => {},
    toggleModal: () => {},
    cancelModal: () => {},
    toggleModalContent: () => {},
    savePost: () => {}
})

const PostContextProvider = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [modalContent, setModalContent] = useState('CREATE_POST');

    const toggleModal = () => {
        setShowModal((prevState) => {
            return !prevState;
        })
    }

    const cancelModal = () => {
        setShowModal(false);
        setModalContent('CREATE_POST');
    }

    const toggleModalContent = () => {
        setModalContent((prevState) => {
            return !prevState;
        })
    }

    const passData = (type,payload) => {
        switch (type) {
            case 'image':
                setImage(payload)
                break;
            default:
                setImage(null)
        }
    }

    const savePost = (payload) => {
        props.onProfileUpdate(props.authToken, props.firebaseKey, 'posts', payload, 'add')
    }

    return (
        <PostContext.Provider value={{savePost: savePost, passData: passData, showModal: showModal, toggleModal: toggleModal, cancelModal: cancelModal, modalContent: modalContent, toggleModalContent: toggleModalContent, image: image}}>
            {props.children}
        </PostContext.Provider>
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

export default connect(mapStateToProps,mapDispatchToProps)(PostContextProvider);
