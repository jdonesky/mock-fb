
import React, {useContext} from 'react';
import Modal from '../Modal';
import {PostContext} from '../../../../context/post-context';
import BaseForm from './BaseForm/BaseForm'
import classes from './CreatePost.css'


const createPost = (props) => {
    const postContext = useContext(PostContext)

    let modalContent;
    switch (postContext.modalContent) {
        case 'CREATE_POST':
            modalContent = <BaseForm />
            break;
        default:
            modalContent = null;
    }

    return (
        <Modal show={postContext.showModal} close={postContext.cancelModal} addClass={classes.CreatePostContainer}>
            {modalContent}
        </Modal>
    );
}

export default createPost;