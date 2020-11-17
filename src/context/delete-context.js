
import React, {useState} from 'react';
import {connect} from 'react-redux'
import * as actions from "../store/actions";

export const DeleteContext = React.createContext({
    field: null,
    id: null,
    passData: () => {},
    showModal: false,
    toggleModal: () => {},
    caption: null,
    deleteAction: () => {},
    deleteEntry: () => {},
    deletePost: () => {},
})

const DeleteContextProvider = (props) => {

    const [showModal, setShowModal] = useState(false)
    const [field, setField] = useState(null)
    const [id, setId] = useState(null)
    const [caption, setCaption] = useState(null);
    const [deleteAction, setDeleteAction] = useState(null);
    const [nestedId1, setNestedId1] = useState(null);
    const [subNested2, setNestedId2] = useState(null)

    const toggleModal = () => {
        setShowModal((prevState) => {
            return !prevState;
        })
    }

    const passData = (field,id,caption, deleteActionType, nestedId1, nestedId2) => {
        setField(field);
        setId(id);
        setCaption(caption);
        // selectDeleteAction(deleteActionType);
        setNestedId1(nestedId1);
        setNestedId2(nestedId2);
    }

    // const selectDeleteAction = (type) => {
    //     switch (type) {
    //         case "DELETE_ABOUT_ENTRY":
    //             setDeleteAction(deleteEntry);
    //             break;
    //         case "DELETE_POST":
    //             setDeleteAction(deletePost);
    //             break;
    //         case "DELETE_POST_COMMENT":
    //             setDeleteAction(null);
    //             break;
    //         case "DELETE_POST_REPLY":
    //             setDeleteAction(null);
    //             break;
    //         default:
    //             setDeleteAction(null);
    //     }
    //     console.log(deleteAction);
    // }

    const deleteEntry = () => {
        props.onProfileUpdate(props.authToken, props.firebaseKey, field, null, 'delete', id);
        toggleModal();
    }

    const deletePost = () => {
        props.onDeletePost(props.authToken, props.postsKey, id)
        toggleModal();
    }

    const deletePostComment = () => {
        toggleModal();
    }

    const deletePostReply = () => {
        toggleModal();
    }

    return (
        <DeleteContext.Provider value={{field: field, id: id, passData: passData, showModal: showModal, toggleModal: toggleModal, caption: caption, deleteAction: deleteAction, deleteEntry: deleteEntry, deletePost: deletePost}}>
            {props.children}
        </DeleteContext.Provider>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        postsKey: state.profile.postsKey
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken, firebaseKey, fieldName, payload, how, id) => dispatch(actions.updateProfileAttempt(authToken, firebaseKey, fieldName, payload, how, id)),
        onDeletePost: (authToken, postsKey, postId) => dispatch(actions.deletePostAttempt(authToken, postsKey, postId)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(DeleteContextProvider);
