
import React, {useContext} from 'react';
import Modal from '../Modal';
import {PostContext} from '../../../../context/post-context';
import BaseForm from './BaseForm/BaseForm'
import ChooseBackground from './ChooseBackground/ChooseBackground'
import TagFriends from './TagFriends/TagFriends'
import Location from './Location/Location'
import classes from './CreatePost.css'


const createPost = (props) => {
    const postContext = useContext(PostContext)

    let modalContent;
    switch (postContext.modalContent) {
        case 'CREATE_POST':
            modalContent = <BaseForm />
            break;
        case 'CHOOSE_BACKGROUND':
            modalContent = <ChooseBackground />
            break;
        case 'TAG_FRIENDS':
            modalContent = <TagFriends />
            break;
        case 'CHECK_IN':
            modalContent = <Location />
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