
import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
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
    pagePosting: false,
    page: null,
    passData: () => {},
    toggleModal: () => {},
    openPageCreateModal: () => {},
    cancelModal: () => {},
    toggleModalContent: () => {},
    toggleEditingPost: () => {},
    recordInitialValues: () => {},
    initialValues: null,
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
    const [comments, setComments] = useState([]);
    const [postsKey, setPostsKey] = useState(null);
    const [userKey, setUserKey] = useState(null);
    const [postId, setPostId] = useState(null);
    const [postProfileImage, setPostProfileImage] = useState(null);

    const [allowPost, setAllowPost] = useState(false);
    const [editingPost, setEditingPost] = useState(false);
    const [initialValues, setInitialValues] = useState({});

    const [pagePosting, setPagePosting] = useState(false);
    const [page, setPage] = useState(null);

    const [postingToWall, setPostingToWall] = useState(false);
    const [otherUser, setOtherUser] = useState(null);


    useEffect(() => {
        if (editingPost) {
            validateEdits();
        } else {
            validatePost();
        }
    }, [text,image,background,tagged,location])

    const openPageCreateModal = (page) => {
        setPagePosting(true)
        setPage(page);
        setShowModal(true);
    }

    const openPostToWallModal = (profile) => {
        setPostingToWall(true);
        setOtherUser(profile);
        setShowModal(true);
    }

    const toggleModal = () => {
        setShowModal((prevState) => {
            return !prevState;
        })
    };

    const cancelModal = () => {
        setShowModal(false);
        setModalContent('CREATE_POST');
        setEditingPost(false);
        setText('');
        setImage(null);
        setBackground(null);
        setTagged([]);
        setLocation(null);
        setComments([]);
        setPostsKey(null);
        setUserKey(null);
        setPostId(null);
        setPage(null);
        setPostProfileImage(null);
        setInitialValues({});
        setEditingPost(false);
        setPagePosting(false);
        setPage(null);
        setPostingToWall(false);
        setOtherUser(null);
    };

    const toggleModalContent = (page) => {
        setModalContent(page)
    };


    const toggleEditingPost = () => {
        setEditingPost(prevState => {
            return !prevState
        })
    }

    const recordInitialValues = (text,image,background,tagged,location) => {
        setInitialValues({
            text: text,
            image: image,
            background: background,
            tagged: tagged,
            location: location
        })
    }

    const validatePost = () => {
        if (!text && !image && !background && !tagged.length && !location) {
            setAllowPost(false);
        } else {
            setAllowPost(true);
        }
    }

    const validateEdits = () => {
        if (initialValues.text !== text ||
            initialValues.image !== image ||
            initialValues.background !== background ||
            initialValues.tagged.length !== tagged.length ||
            initialValues.location !== location) {
            setAllowPost(true);
        } else {
            setAllowPost(false);
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
            case 'tags':
                setTagged([...payload])
            case 'remove-tag':
                setTagged(prevState => {
                    return prevState.filter(tag => tag.id !== payload);
                })
                break;
            case 'location':
                setLocation(payload)
                break;
            case 'comments':
                setComments(payload)
                break;
            case 'postsKey':
                setPostsKey(payload)
                break;
            case 'userKey':
                setUserKey(payload)
                break;
            case 'postProfileImage':
                setPostProfileImage(payload)
                break;
            case 'postId':
                setPostId(payload)
                break;
            default:
                setImage(null)
        }
        if (editingPost) {
            validateEdits();
        } else {
            validatePost();
        }
    };


    const savePost = () => {

        let name;
        let postKey;
        let userKey;
        let publicKey
        if (pagePosting && page) {
            name = page.name
            postKey = page.postsKey
            userKey = page.dbKey
        } else {
            name = props.name;
            postKey = props.postsKey;
            userKey = props.firebaseKey;
            publicKey = props.publicProfileKey;
        }

        const post = {
            text: text,
            image: image || null,
            background: background || null,
            tagged: tagged,
            location: location,
            date: new Date(),
            name: name,
            userKey: userKey,
            postsKey: postKey,
            profileImage: props.profileImage
        };

        if (publicKey) {
            post.publicProfileKey = publicKey
        }

        props.onAddPost(props.authToken, postKey, post);
        setText('');
        setImage(null);
        setBackground(null);
        setTagged([]);
        setLocation(null);
    };


    const saveEdits = () => {

        const post = {
            postsKey: postsKey,
            publicProfileKey: props.publicProfileKey,
            text: text,
            image: image || null,
            background: background || null,
            tagged: tagged,
            comments: comments,
            location: location,
            date: new Date(),
            name: props.name,
            userKey: props.firebaseKey,
            postProfileImage: postProfileImage
        }

        props.onEditPost(props.authToken, postsKey, postId, post);
        setText('');
        setImage(null);
        setBackground(null);
        setTagged([]);
        setLocation(null);
    }

    return (
        <PostContext.Provider value={{savePost: savePost, saveEdits: saveEdits, passData: passData, showModal: showModal, toggleModal: toggleModal, cancelModal: cancelModal, modalContent: modalContent, toggleModalContent: toggleModalContent, toggleEditingPost: toggleEditingPost, recordInitialValues: recordInitialValues, initialValues: initialValues, editingPost: editingPost, text: text, image: image, background: background, tagged: tagged, location: location, allowPost: allowPost, openPageCreateModal: openPageCreateModal, pagePosting: pagePosting, page: page}}>
            {props.children}
        </PostContext.Provider>
    );
};

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        postsKey: state.profile.postsKey,
        publicProfileKey: state.profile.publicProfileKey,
        name: state.profile.firstName + ' ' + state.profile.lastName,
        profileImage: state.profile.profileImage,
        ownedPage: state.pages.ownedPage,
        otherProfile: state.users.otherProfile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: (authToken, postsKey, payload) => dispatch(actions.addPostAttempt(authToken, postsKey, payload)),
        onEditPost: (authToken, postsKey, postId, payload) => dispatch(actions.editPostAttempt(authToken, postsKey, postId, payload))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PostContextProvider));
