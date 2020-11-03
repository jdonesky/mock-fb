import React, {useContext} from 'react';
import Modal from "../Modal";
import classes from "./LifeEventModal.css";
import Close from "../../../../assets/images/close";
import {LifeEventContext} from "../../../../context/life-event-context";
import ChooseCategory from './ChooseCategory'
import CreateEvent from './CreateEvent'


const lifeEventModal = () => {
    const lifeEventContext = useContext(LifeEventContext)

    let modalContent = lifeEventContext.modalContent ? <CreateEvent show={lifeEventContext.showModal} /> : <ChooseCategory show={lifeEventContext.showModal}/>

    return (
        <Modal show={lifeEventContext.showModal} close={lifeEventContext.cancelModal}>
            <div className={classes.CancelIcon} onClick={lifeEventContext.cancelModal}>
                <Close />
            </div>
            {modalContent}
        </Modal>
    );
}

export default lifeEventModal;
