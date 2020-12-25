
import React, {useContext} from 'react';
import classes from '../Shared.css';
import Modal from '../../Modal';
import {PageContext} from "../../../../../context/page-context";
import getWindowDimensions from "../../../../../hooks/getWindowDimensions";
import LocationForm from "./EditLocationForm/EditLocationForm";
import DescriptionForm from "./EditDescriptionForm/EditDescriptionForm";

import Close from '../../../../../assets/images/close'

const editPageModal = props => {
    const {width, height} = getWindowDimensions()
    const pageContext = useContext(PageContext);

    let modalContent;
    switch (pageContext.modalContent) {
        case 'LOCATION':
            modalContent = <LocationForm />
            break;
        case 'DESCRIPTION':
            modalContent = <DescriptionForm />
            break;
        case 'WEBSITE':
            // modalContent = <TagFriends />
            break;
        case 'PHONE':
            // modalContent = <Location />
            break;
        case 'EMAIL':
            // modalContent = <Location />
            break;
        case 'CATEGORY':
            // modalContent = <Location />
            break;
        default:
            modalContent = null;
    }

    return (
        <Modal show={pageContext.showModal ? pageContext.showModal : undefined} close={() => pageContext.setShowModal(false)} addClass={classes.ModalAddClass}>
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