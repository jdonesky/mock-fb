
import React, {useState} from 'react';
import {connect} from 'react-redux'
import * as actions from "../store/actions";

export const PostContext = React.createContext({
    image: null,
    background: null,
    tagged: [],
    showModal: false,
    modalContent: null,
    passData: () => {},
    toggleModal: () => {},
    cancelModal: () => {},
    toggleModalContent: () => {},
    savePost: () => {}
})

const PostContextProvider = (props) => {

    const [showModal, setShowModal] = useState(true);
    const [modalContent, setModalContent] = useState('CREATE_POST');
    const [image, setImage] = useState(null);
    const [background, setBackground] = useState(null);
    const [tagged, setTagged] = useState([]);
    const [location, setLocation] = useState(null);

    const toggleModal = () => {
        setShowModal((prevState) => {
            return !prevState;
        })
    };

    const cancelModal = () => {
        setShowModal(false);
        setModalContent('CREATE_POST');
    };

    const toggleModalContent = (page) => {
        setModalContent(page)
    };

    const passData = (type,payload) => {
        switch (type) {
            case 'image':
                setImage(payload)
                break;
            case 'background':
                setBackground(payload)
                break;
            case 'tag':
                setTagged(prevState => {
                    return [...prevState, payload]
                })
                break;
            case 'remove-tag':
                setTagged(prevState => {
                    return prevState.filter(tag => tag.id !== payload);
                })
                break;
            case 'location':
                setLocation(payload)
                break;
            default:
                setImage(null)
        }
    };

    const savePost = (payload) => {
        props.onProfileUpdate(props.authToken, props.firebaseKey, 'posts', payload, 'add');
    };

    return (
        <PostContext.Provider value={{savePost: savePost, passData: passData, showModal: showModal, toggleModal: toggleModal, cancelModal: cancelModal, modalContent: modalContent, toggleModalContent: toggleModalContent, image: image, background: background, tagged: tagged}}>
            {props.children}
        </PostContext.Provider>
    );
};

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken, firebaseKey, fieldName, payload, how, id) => dispatch(actions.updateProfileAttempt(authToken, firebaseKey, fieldName, payload, how, id))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(PostContextProvider);
