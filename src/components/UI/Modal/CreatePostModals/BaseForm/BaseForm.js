
import React, {useContext} from 'react';
import classes from "../../LifeEventModals/LifeEventModal.css";
import Close from "../../../../../assets/images/close";
import Modal from "../../Modal";
import {LifeEventContext} from "../../../../../context/life-event-context";

const baseForm = (props) => {

    const lifeEventContext = useContext(LifeEventContext);

    return (
        <div>
            <div className={classes.CancelIcon} onClick={lifeEventContext.cancelModal}>
                <Close />
            </div>
            <div>BLANK</div>
        </div>
    );
}

export default baseForm;