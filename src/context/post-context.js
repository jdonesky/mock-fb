
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import * as actions from "../store/actions";

export const PostContext = React.createContext({
    text: '',
    image: null,
    background: null,
    tagged: [],
    location: null,
    showModal: false,
    modalContent: null,
    allowPost: false,
    passData: () => {},
    toggleModal: () => {},
    cancelModal: () => {},
    toggleModalContent: () => {},
    savePost: () => {}
})

const PostContextProvider = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('CREATE_POST');
    const [text,setText] = useState('');
    const [image, setImage] = useState(null);
    const [background, setBackground] = useState(null);
    const [tagged, setTagged] = useState([]);
    const [location, setLocation] = useState(null);
    const [allowPost, setAllowPost] = useState(false);

    useEffect(() => {
        validatePost()
    }, [text,image,background,tagged,location])

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

    const validatePost = () => {
        if (!text && !image && !background && !tagged.length && !location) {
            setAllowPost(false);
        } else {
            setAllowPost(true);
        }
    }

    const passData = (type,payload) => {
        switch (type) {
            case 'text':
                setText(payload)
                break;
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
        validatePost();
    };

    const savePost = () => {
        const post = {
            text: text,
            image: image || null,
            background: background || null,
            tagged: tagged,
            location: location,
            date: new Date(),
            firebaseKey: props.firebaseKey
        };
        props.onProfileUpdate(props.authToken, props.firebaseKey, 'posts', post, 'add');
        setText('');
        setImage(null);
        setBackground(null);
        setTagged([]);
        setLocation(null);
    };

    return (
        <PostContext.Provider value={{savePost: savePost, passData: passData, showModal: showModal, toggleModal: toggleModal, cancelModal: cancelModal, modalContent: modalContent, toggleModalContent: toggleModalContent, text: text, image: image, background: background, tagged: tagged, location: location, allowPost: allowPost}}>
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
