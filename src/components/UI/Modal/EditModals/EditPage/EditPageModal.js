
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

import Close from '../../../../../assets/images/close'

const editPageModal = props => {
    const {width, height} = getWindowDimensions()
    const pageContext = useContext(PageContext);

    let modalContent;
    let modalContainer;
    switch (pageContext.modalContent) {
        case 'LOCATION':
            modalContent = <LocationForm />
            modalContainer = classes.LocationModal;
            break;
        case 'DESCRIPTION':
            modalContent = <DescriptionForm />
            modalContainer = classes.SingleEntryModal;
            break;
        case 'WEBSITE':
            modalContent = <WebsiteForm />
            modalContainer = classes.SingleEntryModal;
            break;
        case 'PHONE':
            modalContent = <PhoneForm />
            modalContainer = classes.SingleEntryModal;
            break;
        case 'EMAIL':
            modalContent = <EmailForm />
            modalContainer = classes.SingleEntryModal;
            break;
        case 'CATEGORY':
            // modalContent = <Location />
            break;
        default:
            modalContent = null;
    }

    return (
        <Modal show={pageContext.showModal ? pageContext.showModal : undefined} close={() => pageContext.setShowModal(false)} addClass={modalContainer}>
            <section className={classes.ContentContainer} style={{width: `${width *.6}px`}}>
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