
import React, {useContext} from 'react';
import {connect} from 'react-redux';
import classes from '../Shared.css';
import Modal from '../../Modal';
import {EditProfileContext} from "../../../../../context/edit-profile-context";
import getWindowDimensions from "../../../../../hooks/getWindowDimensions";
import Close from '../../../../../assets/images/close'

import BaseForm from './BaseForm/BaseForm';
import EditIntro from './EditIntro/EditIntro';
import InlineDots from '../../../Spinner/InlineDots';

const editProfileModal = props => {
    const {width, height} = getWindowDimensions()
    const editProfileContext = useContext(EditProfileContext);

    let title;
    let modalContent;
    let modalContainer;
    switch (editProfileContext.modalContent) {
        case 'BASE':
            title = 'Edit Profile'
            modalContent = <BaseForm />
            modalContainer = [classes.BaseModal, classes.EditProfileModal].join(" ");
            break;
        case 'INTRO':
            title = 'Edit Details'
            modalContent = <EditIntro />
            modalContainer = [classes.BaseModal, classes.EditProfileModal].join(" ");
            break;

        default:
            modalContent = null;
            modalContainer = classes.BaseModal;
    }

    if (props.updatingProfile) {
        title = <InlineDots left="70px" />
    }

    const closeModal = () => {
        editProfileContext.closeEditModal();
        editProfileContext.toggleModalContent('BASE');
    }


    return (
        <Modal show={editProfileContext.showEditModal ? editProfileContext.showEditModal : undefined} close={editProfileContext.closeEditModal} addClass={modalContainer}>
            <section className={classes.ContentContainer}>
                <section className={classes.Header}>
                    <div className={classes.TitleBlock}>
                        <div className={classes.Title}>{title}</div>
                    </div>
                    <div className={classes.ExitModalButton} onClick={closeModal}><Close fill="rgba(0,0,0,.5)"/></div>
                </section>
                <div className={classes.Break}/>
                {modalContent}
            </section>
        </Modal>
    );
}

const mapStateToProps = state => {
    return {
        updatingProfile: state.profile.contentEntryLoading
    }
}
export default connect(mapStateToProps)(editProfileModal);