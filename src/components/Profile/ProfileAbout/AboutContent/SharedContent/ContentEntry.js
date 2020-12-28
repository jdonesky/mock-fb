
import React, {useState, useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import EditWorkForm from "../EditContent/EditWorkForm";
import EditSchoolForm from "../EditContent/EditSchoolForm";
import EditLocationForm from "../EditContent/EditLocationForm";
import EditRelationshipForm from "../EditContent/EditRelationshipForm";
import EditContactForm from "../EditContent/EditContactForm";
import EditEmailForm from "../EditContent/EditEmailForm"
import EditPhoneForm from "../EditContent/EditPhoneForm"
import EditFamilyForm from "../EditContent/EditFamilyForm";
import EditBirthdayForm from "../EditContent/EditBirthdayForm"
import EditGenderForm from "../EditContent/EditGenderForm";

import BriefCase from "../../../../../assets/images/briefcase";
import GraduationCap from "../../../../../assets/images/graduation-cap";
import House from "../../../../../assets/images/home";
import Pin from "../../../../../assets/images/Pin";
import Heart from "../../../../../assets/images/heart";
import Phone from "../../../../../assets/images/phone";
import Padlock from "../../../../../assets/images/padlock";
import Earth from "../../../../../assets/images/earth";
import Friends from "../../../../../assets/images/friends";
import Edit from "../../../../../assets/images/edit";
import Avatar from "../../../../../assets/images/avatar";
import Cake from "../../../../../assets/images/cake";
import Email from "../../../../../assets/images/email";
import Like from "../../../../../assets/images/like";
import Male from "../../../../../assets/images/male";
import Female from "../../../../../assets/images/female";
import Move from "../../../../../assets/images/travel";
import Delete from "../../../../../assets/images/delete"
import Close from "../../../../../assets/images/close"

import OutsideAlerter from "../../../../../hooks/outsideClickHandler";
import {DeleteContext} from "../../../../../context/delete-context";
import classes from "./ContentEntry.css";
import * as actions from '../../../../../store/actions/index'

const contentEntry = props => {

    const [showEditDropdown, setEditDropdown] = useState(false);
    const [editing, setEditing] = useState(false);
    const deleteContext = useContext(DeleteContext)

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
        toggleEditing()
        props.firebaseKey && props.onProfileUpdate(props.authToken, props.firebaseKey, fieldName, payload, 'edit', props.id && props.id)
    }


    let categoryIcon;
    let dropdownCaption;
    let editForm;
    let fieldName;
    switch (props.category) {
        case 'work':
            categoryIcon = <BriefCase fill="rgba(0,0,0,0.6)"/>
            dropdownCaption = 'workplace'
            fieldName = 'occupations'
            editForm = <EditWorkForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'education':
            categoryIcon = <GraduationCap fill="rgba(0,0,0,0.6)"/>
            dropdownCaption = 'school'
            fieldName = 'education'
            editForm = <EditSchoolForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'currLocation':
            categoryIcon = <House fill="rgba(0,0,0,0.6)"/>
            dropdownCaption = 'current location'
            fieldName = 'currLocation'
            editForm = <EditLocationForm locType="current" cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'pastLocation':
            categoryIcon = <Move fill="rgba(0,0,0,0.6)"/>
            dropdownCaption = 'past location'
            fieldName = 'pastLocations'
            editForm = <EditLocationForm locType="pastLocation" cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'fromLocation':
            categoryIcon = <Pin fill="rgba(0,0,0,0.6)"/>
            dropdownCaption = 'hometown'
            fieldName = 'hometown'
            editForm = <EditLocationForm locType="origin" cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'relationship':
            categoryIcon = <Heart fill="rgba(0,0,0,0.6)"/>
            dropdownCaption = 'relationship status'
            fieldName = 'relationships'
            editForm = <EditRelationshipForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'family':
            categoryIcon = <Avatar fill="rgba(0,0,0,0.6)"/>
            dropdownCaption = 'family member'
            fieldName = 'family'
            editForm = <EditFamilyForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'contact':
            categoryIcon = <Phone fill="rgba(0,0,0,0.6)"/>
            dropdownCaption = 'contact information'
            fieldName = 'contacts'
            editForm = <EditContactForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'phone':
            categoryIcon = <Phone fill="rgba(0,0,0,0.6)"/>
            dropdownCaption = 'phone number'
            fieldName = 'phone'
            editForm = <EditPhoneForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'email':
            categoryIcon = <Email fill="rgba(0,0,0,0.6)"/>
            dropdownCaption = 'email'
            fieldName = 'email'
            editForm = <EditEmailForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'birthday':
            categoryIcon = <Cake fill="rgba(0,0,0,0.6)"/>
            dropdownCaption = 'birthday'
            fieldName = 'birthday'
            editForm = <EditBirthdayForm cancel={toggleEditing} save={saveEdits}/>
            break;
        case 'gender':
            if (props.extra === 'Male') {
                categoryIcon = <Male fill="rgba(0,0,0,0.6)"/>
            } else if (props.extra === 'Female') {
                categoryIcon = <Female fill="rgba(0,0,0,0.6)"/>
            } else {
                categoryIcon = <Like fill="rgba(0,0,0,0.6)"/>
            }
            dropdownCaption = 'gender'
            fieldName = 'gender'
            editForm = <EditGenderForm cancel={toggleEditing} save={saveEdits}/>
            break;
        default:
            categoryIcon = null;
            dropdownCaption = null;
            editForm = null;
    }


    let shareIcon;
    switch (props.sharedWith) {
        case 'public':
            shareIcon =  <Earth fill="rgba(0,0,0,.6)"/>
            break;
        case 'private':
            shareIcon = <Padlock fill="rgba(0,0,0,.6)" />
            break;
        case 'friends':
            shareIcon = <Friends fill="rgba(0,0,0,.6)"/>
            break;
        default:
            shareIcon = <Earth fill="rgba(0,0,0,.6)"/>
    }

    const toggleDeleteModal = () => {
        toggleEditDropdown()
        deleteContext.passData(fieldName && fieldName, props.id && props.id, dropdownCaption && dropdownCaption, 'DELETE_ABOUT_ENTRY')
        deleteContext.toggleModal();
    }

    let editIcons;
    if (props.displayProfile === 'me') {
        editIcons = (
            <div className={classes.Icons}>
                <div className={[classes.Icon, classes.Share].join(" ")}>
                    {shareIcon}
                </div>
                <div className={[classes.Icon,classes.Edit].join(" ")} onClick={toggleEditDropdown} style={{background: showEditDropdown && "rgba(0,0,0,0.1)", borderRadius: "100px"}}>
                    {showEditDropdown ? <Close className={classes.CancelSvg}/> : <Edit fill="rgba(0,0,0,0.6)"/> }
                </div>
                { showEditDropdown &&
                <OutsideAlerter action={toggleEditDropdown}>
                    <div className={editDropdownClasses.join(' ')}>
                        <div className={classes.UpArrow} style={{bottom: !props.content && '42px'}}/>
                        <div className={classes.MenuItem} onClick={toggleEditing}>
                            <div className={classes.DropdownIcon}><Edit fill= "rgba(0,0,0,0.6)"/></div>
                            <span className={classes.DropdownText}>{`Edit ${dropdownCaption}`}</span></div>
                        {props.content && <div className={classes.MenuItem} onClick={toggleDeleteModal}>
                            <div className={classes.DropdownIcon}><Delete fill="rgba(0,0,0,0.6)"/></div>
                            <span className={classes.DropdownText}>{`Delete ${dropdownCaption}`}</span>
                        </div>
                        }
                    </div>
                </OutsideAlerter>
                }
            </div>
        )
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
            {editIcons}
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
        onProfileUpdate: (authToken, firebaseKey, fieldName, payload, how, id) => dispatch(actions.updateProfileAttempt(authToken, firebaseKey, fieldName, payload, how, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(contentEntry);