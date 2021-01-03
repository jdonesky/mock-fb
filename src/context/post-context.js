
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
    openPostToOtherModal: () => {},
    postingToOther: false,
    otherUser: null,
    otherUserType: null,
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

    const [postingToOther, setPostingToOther] = useState(false);
    const [otherUser, setOtherUser] = useState(null);
    const [otherUserType, setOtherUserType] = useState(null);

    const [pagePosted,setPagePosted] = useState(false);
    const [postedToOther, setPostedToOther] = useState(false);
    const [other, setOther] = useState(null);

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

    const openPostToOtherModal = (profile, type, page) => {
        if (page) {
            setPagePosting(true)
            setPage(page)
        }
        setPostingToOther(true);
        setOtherUser(profile);
        setOtherUserType(type);
        setShowModal(true);
    }

    const toggleModal = () => {
        setShowModal((prevState) => {
            return !prevState;
        })
    };

    const clearAllData = () => {
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
        setPagePosted(false);
        setPostingToOther(false);
        setOtherUser(null);
        setOtherUserType(null);
    }

    const cancelModal = () => {
        setShowModal(false);
        clearAllData()
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
            case 'pagePosted':
                setPagePosted(payload)
                break
            case 'postedToOther':
                setPostedToOther(payload)
                break;
            case 'other':
                setOther(payload)
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
        let profileImage;
        let publicKey;
        let other;
        if (pagePosting && page && !postingToOther) {
            name = page.name
            postKey = page.postsKey
            userKey = page.dbKey
            profileImage = page.profileImage;
        } else if (!pagePosting && postingToOther && otherUserType === 'USER' && otherUser) {
            name = props.name;
            userKey = props.firebaseKey;
            publicKey = props.publicProfileKey;
            postKey = otherUser.postsKey;
            profileImage = props.profileImage;
            other = {name: otherUser.firstName + ' ' + otherUser.lastName, userKey: otherUser.userKey, publicProfileKey: otherUser.publicProfileKey}
        } else if (pagePosting && page && postingToOther && otherUserType === 'USER' && otherUser) {
            name = props.name;
            userKey = page.dbKey;
            postKey = otherUser.postsKey;
            profileImage = page.profileImage;
            other = {name: otherUser.firstName + ' ' + otherUser.lastName, userKey: otherUser.userKey, publicProfileKey: otherUser.publicProfileKey}
        } else if (!pagePosting && postingToOther && otherUserType === 'PAGE' && otherUser) {
            name = props.name;
            userKey = props.firebaseKey;
            publicKey = props.publicProfileKey;
            postKey = otherUser.dbKey;
            profileImage = props.profileImage;
            other = {name: otherUser.name, userKey: otherUser.dbKey}
        } else if (pagePosting && page && postingToOther && otherUserType === 'PAGE' && otherUser) {
            name = page.name;
            userKey = page.dbKey;
            postKey = otherUser.dbKey;
            profileImage = page.profileImage;
            other = {name: otherUser.name, userKey: otherUser.dbKey}
        } else {
            name = props.name;
            userKey = props.firebaseKey;
            publicKey = props.publicProfileKey;
            postKey = props.postsKey;
            profileImage = props.profileImage
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
            publicKey: publicKey,
            profileImage: profileImage,
            pagePosted: pagePosting,
            postedToOther: postingToOther,
            otherUser: other
        };

        props.onAddPost(props.authToken, postKey, post);
        clearAllData()
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
            postProfileImage: postProfileImage,
            pagePosted: pagePosted,
            postedToOther: postedToOther,
            otherUser: other
        }

        props.onEditPost(props.authToken, postsKey, postId, post);
        clearAllData()
    }

    return (
        <PostContext.Provider value={{savePost: savePost, saveEdits: saveEdits, passData: passData, showModal: showModal, toggleModal: toggleModal, cancelModal: cancelModal, modalContent: modalContent, toggleModalContent: toggleModalContent, toggleEditingPost: toggleEditingPost, recordInitialValues: recordInitialValues, initialValues: initialValues, editingPost: editingPost, text: text, image: image, background: background, tagged: tagged, location: location, allowPost: allowPost, openPageCreateModal: openPageCreateModal, pagePosting: pagePosting, page: page, openPostToOtherModal: openPostToOtherModal, postingToOther: postingToOther, otherUser: otherUser, otherUserType: otherUserType}}>
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
