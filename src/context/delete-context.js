
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import * as actions from "../store/actions";

export const DeleteContext = React.createContext({
    field: null,
    id: null,
    passData: () => {},
    showModal: false,
    toggleModal: () => {},
    cancelDelete: () => {},
    caption: null,
    deleteAction: null,
    deleteEntry: () => {},
})


const DeleteContextProvider = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [field, setField] = useState(null);
    const [id, setId] = useState(null);
    const [caption, setCaption] = useState(null);
    const [deleteAction, setDeleteAction] = useState(null);
    const [nestedId1, setNestedId1] = useState(null);
    const [nestedId2, setNestedId2] = useState(null);
    const [nestedId3, setNestedId3] = useState(null);

    // useEffect(() => {
    //     console.log('deleteAction', deleteAction);
    //     console.log('postsKey', nestedId1)
    //     console.log('postId', id);
    // })

    const toggleModal = () => {
        setShowModal((prevState) => {
            return !prevState;
        })
    }

    const clearAllData = () => {
        setField(null);
        setId(null);
        setCaption(null);
        setDeleteAction(null);
        setNestedId1(null);
        setNestedId2(null);
        setNestedId3(null);
    }

    const cancelDelete = () => {
        setShowModal(false);
        clearAllData();
    }

    const passData = (field,id,caption, deleteActionType, nestedId1, nestedId2, nestedId3) => {
        setField(field);
        setId(id);
        setCaption(caption);
        setDeleteAction(deleteActionType);
        setNestedId1(nestedId1);
        setNestedId2(nestedId2);
        setNestedId3(nestedId3);
    }

    const deleteEntry = () => {
        switch (deleteAction) {
            case "DELETE_ABOUT_ENTRY":
                props.onProfileUpdate(props.authToken, props.firebaseKey, field, null, 'delete', id);
                break;
            case "DELETE_POST":
                props.onDeletePost(props.authToken, nestedId1, id)
                break;
            case "DELETE_POST_COMMENT":
                props.onDeletePostComment(props.authToken, id, nestedId1, nestedId2)
                break;
            case "DELETE_POST_REPLY":
                props.onDeletePostReply(props.authToken, id, nestedId1, nestedId2, nestedId3)
                break;
            default:
                throw new Error('Oops, none of the above!')

        }
        clearAllData()
        toggleModal();
    }


    return (
        <DeleteContext.Provider value={{field: field, id: id, passData: passData, showModal: showModal, toggleModal: toggleModal, caption: caption, deleteAction: deleteAction, deleteEntry: deleteEntry, cancelDelete: cancelDelete}}>
            {props.children}
        </DeleteContext.Provider>
    );
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
        myPostsKey: state.profile.postsKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken, firebaseKey, fieldName, payload, how, id) => dispatch(actions.updateProfileAttempt(authToken, firebaseKey, fieldName, payload, how, id)),
        onDeletePost: (authToken, postsKey, postId) => dispatch(actions.deletePostAttempt(authToken, postsKey, postId)),
        onDeletePostComment: (authToken, postsKey, postId, commentId) => dispatch(actions.deleteCommentAttempt(authToken, postsKey, postId, commentId)),
        onDeletePostReply: (authToken, postsKey, postId, commentId, replyId) => dispatch(actions.deleteReplyAttempt(authToken, postsKey, postId, commentId, replyId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(DeleteContextProvider);
