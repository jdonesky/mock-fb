
import React, {useContext} from 'react';
import classes from '../../Post.css'
import Pen from "../../../../../../../assets/images/edit";
import Lock from "../../../../../../../assets/images/padlock";
import Delete from "../../../../../../../assets/images/delete";
import {UnderConstructionContext} from "../../../../../../../context/under-construction-context";

const editOwnPostDropdown = (props) => {

    const underConstruction = useContext(UnderConstructionContext)

    return (
        <div className={classes.EditDropdownContainer} style={{display: props.editingDropdown ? 'flex' : 'none'}}>
            <div className={classes.BaseArrow}/>
            <div className={classes.EditDropdownButton} onClick={props.toggleEditModal}>
                <div className={classes.EditDropDownButtonIcon}><Pen/></div>
                <span>Edit post</span></div>
            <div className={classes.EditDropdownButton} onClick={underConstruction.openModal}>
                <div className={classes.EditDropDownButtonIcon}><Lock/></div>
                <span>Edit audience</span></div>
            <div className={classes.EditDropdownButton} onClick={props.toggleDeleteModal}>
                <div className={classes.EditDropDownButtonIcon}><Delete/></div>
                <span>Delete post</span></div>
        </div>
    )
}

export default editOwnPostDropdown;