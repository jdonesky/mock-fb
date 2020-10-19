
import React, {useState} from 'react';
import {connect} from 'react-redux';
import EditWorkForm from "../EditContent/EditWorkForm";
import EditSchoolForm from "../EditContent/EditSchoolForm";
import EditLocationForm from "../EditContent/EditLocationForm";
import EditRelationshipForm from "../EditContent/EditRelationshipForm";
import EditContactForm from "../EditContent/EditContactForm";
import EditFamilyForm from "../EditContent/EditFamilyForm";
import BriefCase from "../../../../../assets/images/briefcase";
import GraduationCap from "../../../../../assets/images/graduation-cap";
import House from "../../../../../assets/images/home";
import Pin from "../../../../../assets/images/pin";
import Heart from "../../../../../assets/images/heart";
import Phone from "../../../../../assets/images/phone";
import Padlock from "../../../../../assets/images/padlock";
import Earth from "../../../../../assets/images/earth";
import Friends from "../../../../../assets/images/friends";
import Edit from "../../../../../assets/images/edit"
import Avatar from "../../../../../assets/images/avatar"

import classes from "./ContentEntry.css";
import * as actions from '../../../../../store/actions/index'

const contentEntry = props => {

    const [showEditDropdown, setEditDropdown] = useState(false);
    const [editing, setEditing] = useState(false);

    let editDropdownClasses = [classes.EditDropdown]
    if (showEditDropdown) {
        editDropdownClasses.push(classes.VisibleDropdown)
    }

    const toggleEditDropdown = () => {
        setEditDropdown((prevState) => {
            return !prevState
        })
    }

    const toggleEditing = () => {
        setEditing((prevState) => {
            return !prevState
        })
        if (setEditDropdown) {
            setEditDropdown(false)
        }
    }

    const saveEdits = (fieldName, payload) => {
        props.onProfileUpdate(props.authToken, props.firebaseKey, fieldName, payload, 'edit')
    }

    let categoryIcon;
    let dropdownCaption;
    let editForm;
    switch (props.category) {
        case 'work':
            categoryIcon = <BriefCase />
            dropdownCaption = 'workplace'
            editForm = <EditWorkForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'education':
            categoryIcon = <GraduationCap />
            dropdownCaption = 'school'
            editForm = <EditSchoolForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'currLocation':
            categoryIcon = <House />
            dropdownCaption = 'current location'
            editForm = <EditLocationForm locType="current" cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'fromLocation':
            categoryIcon = <Pin />
            dropdownCaption = 'hometown'
            editForm = <EditLocationForm locType="origin" cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'relationship':
            categoryIcon = <Heart />
            dropdownCaption = 'relationship status'
            editForm = <EditRelationshipForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'family':
            categoryIcon = <Avatar />
            dropdownCaption = 'family member'
            editForm = <EditFamilyForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'contact':
            categoryIcon = <Phone />
            dropdownCaption = 'contact information'
            editForm = <EditContactForm cancel={toggleEditing} save={saveEdits}/>
            break;
        default:
            categoryIcon = null;
            dropdownCaption = null;
            editForm = null;
    }

    let shareIcon;
    switch (props.sharedWith) {
        case 'public':
            shareIcon =  <Earth />
            break;
        case 'private':
            shareIcon = <Padlock />
            break;
        case 'friends':
            shareIcon = <Friends />
            break;
        default:
            shareIcon = <Earth />
    }


    const entry = (
        <div className={classes.Entry}>
            <div className={classes.Icon}>
                {categoryIcon}
            </div>
            <div className={classes.Text}>
                <span>{props.mainText}</span>
                {props.subText && <span className={classes.SubText}>{props.subText}</span>}
            </div>
            <div className={classes.Icons}>
                <div className={[classes.Icon, classes.Share].join(" ")}>
                    {shareIcon}
                </div>
                <div className={[classes.Icon,classes.Edit].join(" ")} onClick={toggleEditDropdown}>
                    <Edit />
                </div>
                <div className={editDropdownClasses.join(' ')} >
                    <div className={classes.UpArrow}/>
                    <div className={classes.MenuItem} onClick={toggleEditing}><span className={classes.EditIcon}></span><span>{`Edit ${dropdownCaption}`}</span></div>
                    <div className={classes.MenuItem}><span className={classes.DeleteIcon}></span><span>{`Delete ${dropdownCaption}`}</span></div>
                </div>
            </div>
        </div>
    );

    let content = editing? editForm : entry;
    return content;
}

const mapStateToProps = state => {
    return {
        authToken: state.auth.token,
        firebaseKey: state.profile.firebaseKey,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProfileUpdate: (authToken, firebaseKey, fieldName, payload, how) => dispatch(actions.updateProfileAttempt(authToken, firebaseKey, fieldName, payload, how))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(contentEntry);