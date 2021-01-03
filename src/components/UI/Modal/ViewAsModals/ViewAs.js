
import React, {useContext} from 'react';
import classes from './ViewAs.css';
import Modal from '../Modal';
import {ViewAsContext} from "../../../../context/view-as-context";

const viewAsModal = () => {

    const viewAsContext = useContext(ViewAsContext);

    let message;
    if (viewAsContext.message) {
        message = <div className={classes.Message}></div>
    }

    return (
        <Modal  show={viewAsContext.showModal || undefined} addClass={classes.Container}>

        </Modal>
    )
}