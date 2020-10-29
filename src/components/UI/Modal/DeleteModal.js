import React, {useContext} from 'react';
import Modal from "./Modal";
import classes from "./DeleteModal.css";
import Close from "../../../assets/images/close";
import sharedClasses from "../../Profile/ProfileAbout/AboutContent/EditContent/SharedEditFormUI.css";
import Button from "../Button/Button";
import {DeleteContext} from "../../../context/delete-context";

const deleteModal = () => {
    const deleteContext = useContext(DeleteContext)
    return (
        <Modal show={deleteContext.showModal}>
            <div className={classes.DeleteModal}>
                <div className={classes.Header}>
                    <h1>Are you sure?</h1>
                    <div className={classes.CancelIcon} onClick={deleteContext.toggleModal}>
                        <Close/>
                    </div>
                </div>
                <div className={classes.Break}/>
                <p>{`Are you sure you want to remove this ${deleteContext.caption} from your profile?`}</p>
                <div className={sharedClasses.Buttons}>
                    <div className={sharedClasses.SubmitOrCancel} style={{marginLeft: 'auto', marginBottom: '10px'}}>
                        <Button addClass="Neutral" clicked={deleteContext.toggleModal}>Cancel</Button>
                        <Button addClass="Save" clicked={deleteContext.deleteEntry}>Confirm</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default deleteModal;
