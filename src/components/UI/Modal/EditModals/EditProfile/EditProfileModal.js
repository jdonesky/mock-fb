
import React, {useContext} from 'react';
import classes from '../Shared.css';
import Modal from '../../Modal';
import {EditProfileContext} from "../../../../../context/edit-profile-context";
import getWindowDimensions from "../../../../../hooks/getWindowDimensions";
import Close from '../../../../../assets/images/close'

import BaseForm from './BaseForm/BaseForm';

const editProfileModal = props => {
    const {width, height} = getWindowDimensions()
    const editProfileContext = useContext(EditProfileContext);

    let modalContent;
    let modalContainer;
    switch (editProfileContext.modalContent) {
        case 'BASE':
            modalContent = <BaseForm />
            modalContainer = [classes.BaseModal, classes.EditProfileModal].join(" ");
            break;
        case 'DESCRIPTION':
            // modalContent = <DescriptionForm />
            // modalContainer = classes.SingleEntryModal;
            break;

        default:
            modalContent = null;
            modalContainer = classes.BaseModal;
    }

    return (
        <Modal show={editProfileContext.showEditModal ? editProfileContext.showEditModal : undefined} close={editProfileContext.closeEditModal} addClass={modalContainer}>
            <section className={classes.ContentContainer}>
                <section className={classes.Header}>
                    <div className={classes.TitleBlock}>
                        <div className={classes.Title}>Edit Profile</div>
                    </div>
                    <div className={classes.ExitModalButton} onClick={() => editProfileContext.closeEditModal()}><Close fill="rgba(0,0,0,.5)"/></div>
                </section>
                <div className={classes.Break}/>
                {modalContent}
            </section>
        </Modal>
    );
}

export default editProfileModal;