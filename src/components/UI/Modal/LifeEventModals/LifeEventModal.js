import React, {useContext} from 'react';
import Modal from "../Modal";
import classes from "./LifeEventModal.css";
import Close from "../../../../assets/images/close";
import {LifeEventContext} from "../../../../context/life-event-context";
import ChooseCategory from './ChooseCategory'
import CreateEvent from './CreateEvent'


const lifeEventModal = () => {
    const lifeEventContext = useContext(LifeEventContext)

    let modalContent = lifeEventContext.modalContent ? <CreateEvent /> : <ChooseCategory />

    return (
        <Modal show={lifeEventContext.showModal}>
            <div className={classes.CancelIcon} onClick={lifeEventContext.toggleModal}>
                <Close/>
            </div>
            {modalContent}

        </Modal>
    );
}

export default lifeEventModal;
