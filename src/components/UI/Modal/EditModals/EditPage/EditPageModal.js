
import React, {useContext} from 'react';
import classes from '../Shared.css';
import Modal from '../../Modal';
import {PageContext} from "../../../../../context/page-context";
import getWindowDimensions from "../../../../../hooks/getWindowDimensions";
import LocationForm from "./EditLocationForm/EditLocationForm";
import DescriptionForm from "./EditDescriptionForm/EditDescriptionForm";
import WebsiteForm from './EditWebsiteForm/EditWebsiteForm';
import PhoneForm from './EditPhoneForm/EditPhoneForm';
import EmailForm from './EditEmailForm/EditEmailForm';
import CategoryForm from './EditCategoryForm/EditCategoryForm';
import Close from '../../../../../assets/images/close'

const editPageModal = props => {
    const {width, height} = getWindowDimensions()
    const pageContext = useContext(PageContext);

    let modalContent;
    let modalContainer = [classes.BaseModal]
    switch (pageContext.modalContent) {
        case 'LOCATION':
            modalContent = <LocationForm />
            modalContainer.push(classes.LocationModal)
            break;
        case 'DESCRIPTION':
            modalContent = <DescriptionForm />
            modalContainer.push(classes.SingleEntryModal);
            break;
        case 'WEBSITE':
            modalContent = <WebsiteForm />
            modalContainer.push(classes.SingleEntryModal);
            break;
        case 'PHONE':
            modalContent = <PhoneForm />
            modalContainer.push(classes.SingleEntryModal);
            break;
        case 'EMAIL':
            modalContent = <EmailForm />
            modalContainer.push(classes.SingleEntryModal);
            break;
        case 'CATEGORY':
            modalContent = <CategoryForm />
            modalContainer.push(classes.SingleEntryModal);
            break;
        default:
            modalContent = null;
    }

    return (
        <Modal show={pageContext.showModal ? pageContext.showModal : undefined} close={() => pageContext.setShowModal(false)} addClass={modalContainer.join(" ")}>
            <section className={classes.ContentContainer}>
                <section className={classes.Header}>
                    <div className={classes.TitleBlock}>
                        <div className={classes.Title}>Edit Page Info</div>
                    </div>
                    <div className={classes.ExitModalButton} onClick={() => pageContext.setShowModal(false)}><Close fill="rgba(0,0,0,.5)"/></div>
                </section>
                <div className={classes.Break}/>
                {modalContent}
            </section>
        </Modal>
    );
}

export default editPageModal;